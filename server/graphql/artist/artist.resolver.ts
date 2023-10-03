import { Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ArtistService } from '@/graphql/artist/artist.service';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';
import { ServerID } from '@/common/decorators/server.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';

@Resolver(() => ArtistModel)
export class ArtistResolver {
  constructor(private readonly mediaService: ArtistService) {}

  @Query(() => [ArtistModel])
  async artists(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ArtistModel[]> {
    return await this.mediaService.find_all({ server_id, i18n });
  }

  @ResolveField(() => [TrackModel])
  async artist_tracks(
    @Parent() artist: ArtistModel,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackModel[]> {
    return await this.mediaService.find_tracks(artist.id, {
      server_id,
      i18n,
    });
  }
}
