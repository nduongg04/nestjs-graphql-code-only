import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

enum SortOrder {
    asc = 'asc',
    desc = 'desc',
}

registerEnumType(SortOrder, {
    name: 'SortOrder',
});

@InputType()
export class AuthorOrderByWithRelationInput {
    @Field((type) => SortOrder)
    id: SortOrder;

    @Field((type) => SortOrder)
    firstName: SortOrder;

    @Field((type) => SortOrder)
    lastName: SortOrder;
}

@InputType()
export class QueryAuthorsInput {
    @Field((type) => Int, { nullable: true })
    skip?: number;

    @Field((type) => Int, { nullable: true })
    take?: number;

    @Field((type) => AuthorOrderByWithRelationInput, { nullable: true })
    orderBy?: AuthorOrderByWithRelationInput;
}
