import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { TrackResolver } from '@/graphql/track/track.resolver';
import { TrackService } from '@/graphql/track/track.service';
import { SpotifyService } from '@/common/util/spotify.service';

@Module({
  providers: [TrackResolver, TrackService, SpotifyService, PrismaService],
})
export class TrackModule {}
