import { Module } from '@nestjs/common';
import { ArtistService } from '@/graphql/artist/artist.service';
import { ArtistResolver } from '@/graphql/artist/artist.resolver';

@Module({
  providers: [ArtistResolver, ArtistService],
})
export class ArtistModule {}
