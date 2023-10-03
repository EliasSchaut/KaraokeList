import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/services/prisma.service';
import { RequestResolver } from '@/graphql/request/request.resolver';
import { RequestService } from '@/graphql/request/request.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [RequestResolver, RequestService, PrismaService, JwtService],
})
export class RequestModule {}
