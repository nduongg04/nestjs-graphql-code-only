import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
    @Query((returns) => String)
    async helloWorld() {
        return 'Hello, world!';
    }
}
