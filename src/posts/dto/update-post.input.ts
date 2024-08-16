import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
    @Field((type) => Int)
    id: number;

    @Field({ nullable: true })
    title?: string;

    @Field((type) => Int, { nullable: true })
    votes?: number;
}
