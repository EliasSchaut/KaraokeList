import { Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ArtistService } from '@/graphql/artist/artist.service';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';

@Resolver(() => ArtistModel)
export class ArtistResolver {
  constructor(private readonly mediaService: ArtistService) {}

  @Query(() => [ArtistModel], {
    name: 'artists',
  })
  async find_many(
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ArtistModel[]> {
    return await this.mediaService.find_many({ i18n });
  }

  @ResolveField(() => [TrackModel], {
    name: 'artist_tracks',
  })
  async resolve_tracks(
    @Parent() artist: ArtistModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackModel[]> {
    return await this.mediaService.resolve_tracks(artist.id, {
      i18n,
    });
  }
}
