import { Field, InputType } from '@nestjs/graphql';
import { NewPostInput } from 'src/posts/dto/new-post.input';
import { Post } from 'src/posts/models/post.model';

@InputType()
export class NewAuthorInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field((type) => [NewPostInput], { nullable: true })
    posts?: NewPostInput[];
}
