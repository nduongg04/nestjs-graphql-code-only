import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver((of) => Post)
export class PostsResolver {
    constructor(private postsService: PostsService) {}

    @Query((returns) => [Post])
    async posts() {
        return this.postsService.posts({});
    }

    @Query((returns) => Post)
    async post(@Args('id', { type: () => Int }) id: number) {
        return this.postsService.post({ id });
    }

    @Mutation((returns) => Post)
    async updatePost(
        @Args('updatePostInput', { type: () => UpdatePostInput })
        updatePostInput: UpdatePostInput,
    ) {
        return this.postsService.updatePost({
            where: { id: updatePostInput.id },
            data: {
                title: updatePostInput.title,
                votes: updatePostInput.votes,
            },
        });
    }

    @Mutation((returns) => Post)
    async deletePost(@Args('id', { type: () => Int }) id: number) {
        return this.postsService.deletePost({ id });
    }
}
