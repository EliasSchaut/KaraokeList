import { Module } from '@nestjs/common';
import { MediaService } from '@/graphql/media/media.service';
import { MediaResolver } from '@/graphql/media/media.resolver';
import { PrismaService } from '@/common/db/prisma.service';

@Module({
  providers: [MediaResolver, MediaService, PrismaService],
})
export class MediaModule {}
