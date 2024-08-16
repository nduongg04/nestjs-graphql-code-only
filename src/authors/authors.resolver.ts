import {
    Args,
    Int,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PostsService } from 'src/posts/posts.service';
import { AuthorsService } from './authors.service';
import { NewAuthorInput } from './dto/new-author.input';
import { QueryAuthorsInput } from './dto/query-authors.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './models/author.model';
import { NewPostInput } from 'src/posts/dto/new-post.input';

@Resolver((of) => Author)
export class AuthorsResolver {
    constructor(
        private authorsService: AuthorsService,
        private postsService: PostsService,
    ) {}

    @Query((returns) => [Author])
    async authors(
        @Args('queryAuthorsInput', { nullable: true })
        queryAuthorsInput: QueryAuthorsInput,
    ) {
        return this.authorsService.authors(queryAuthorsInput);
    }

    @Query((returns) => Author)
    async author(@Args('id', { type: () => Int }) id: number) {
        return this.authorsService.author({ id });
    }
    @ResolveField()
    async posts(@Parent() author: Author) {
        const { id } = author;
        return this.postsService.posts({ where: { authorId: id } });
    }

    @Mutation((returns) => Author)
    async createAuthor(
        @Args('newAuthorInput', { type: () => NewAuthorInput })
        newAuthorInput: NewAuthorInput,
    ) {
        try {
            const authorData: Prisma.AuthorCreateInput = {
                firstName: newAuthorInput.firstName,
                lastName: newAuthorInput.lastName,
                posts: newAuthorInput.posts
                    ? { create: newAuthorInput.posts }
                    : undefined,
            };
            return this.authorsService.createAuthor(authorData);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create author');
        }
    }

    @Mutation((returns) => Author)
    async updateAuthor(
        @Args('updateAuthorInput', { type: () => UpdateAuthorInput })
        updateAuthorInput: UpdateAuthorInput,
    ) {
        try {
            const author = await this.authorsService.author({
                id: updateAuthorInput.id,
            });
            if (!author) {
                throw new Error('Author not found');
            }
            const authorData: Prisma.AuthorUpdateInput = {
                firstName: updateAuthorInput.firstName,
                lastName: updateAuthorInput.lastName,
            };
            return this.authorsService.updateAuthor({
                where: { id: updateAuthorInput.id },
                data: authorData,
            });
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update author');
        }
    }

    @Mutation((returns) => Author)
    async createPost(
        @Args('authorId', { type: () => Int }) authorId: number,
        @Args('post', { type: () => NewPostInput }) post: NewPostInput,
    ) {
        try {
            const author = await this.authorsService.author({ id: authorId });
            if (!author) {
                throw new Error('Author not found');
            }
            return this.authorsService.updateAuthor({
                where: { id: authorId },
                data: {
                    posts: {
                        create: post,
                    },
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error('Failed to add post to author');
        }
    }

    @Mutation((returns) => Author)
    async deleteAuthor(@Args('id', { type: () => Int }) id: number) {
        try {
            const author = await this.authorsService.author({
                id: id,
            });
            if (!author) {
                throw new Error('Author not found');
            }
            const posts = await this.postsService.posts({
                where: { authorId: id },
            });

            await this.postsService.deletePosts({ authorId: id });
            await this.authorsService.deleteAuthor({ id });

            return { ...author, posts };
        } catch (error) {
            console.error(error);
            throw new Error('Failed to delete author');
        }
    }
}
