import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
    providers: [PostsResolver, PostsService],
	exports: [PostsService],
})
export class PostsModule {}
