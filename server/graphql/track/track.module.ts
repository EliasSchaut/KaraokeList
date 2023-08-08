import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { TrackResolver } from '@/graphql/track/track.resolver';
import { TrackService } from '@/graphql/track/track.service';

@Module({
  providers: [TrackResolver, TrackService, PrismaService],
})
export class TrackModule {}
