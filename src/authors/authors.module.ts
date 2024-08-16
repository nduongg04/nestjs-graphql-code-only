import { Module } from '@nestjs/common';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';
import { PostsModule } from 'src/posts/posts.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	imports: [PostsModule, PrismaModule],
	providers: [AuthorsResolver, AuthorsService],
})
export class AuthorsModule {}
