import { Module } from '@nestjs/common';
import { ServerResolver } from './server.resolver';
import { ServerService } from './server.service';
import { PrismaService } from '@/common/services/prisma.service';

@Module({
  providers: [ServerResolver, ServerService, PrismaService],
})
export class ServerModule {}
