import { Module } from '@nestjs/common';
import { ArtistService } from '@/graphql/artist/artist.service';
import { ArtistResolver } from '@/graphql/artist/artist.resolver';
import { PrismaService } from '@/common/db/prisma.service';

@Module({
  providers: [ArtistResolver, ArtistService, PrismaService],
})
export class ArtistModule {}
