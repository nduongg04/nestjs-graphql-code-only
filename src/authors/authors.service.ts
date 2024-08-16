import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryAuthorsInput } from './dto/query-authors.input';

@Injectable()
export class AuthorsService {
    constructor(private prisma: PrismaService) {}

    async author(authorWhereUniqueInput: Prisma.AuthorWhereUniqueInput) {
        return this.prisma.author.findUnique({
            where: authorWhereUniqueInput,
        });
    }

    async authors(params: QueryAuthorsInput) {
        const { skip, take, orderBy } = params || {};
        return this.prisma.author.findMany({
            skip,
            take,
            orderBy,
        });
    }

    async createAuthor(data: Prisma.AuthorCreateInput) {
        return this.prisma.author.create({
            data,
        });
    }

    async updateAuthor(params: {
        where: Prisma.AuthorWhereUniqueInput;
        data: Prisma.AuthorUpdateInput;
    }) {
        const { where, data } = params;
        return this.prisma.author.update({
            data,
            where,
        });
    }

    async deleteAuthor(where: Prisma.AuthorWhereUniqueInput) {
        return this.prisma.author.delete({
            where,
        });
    }
}
