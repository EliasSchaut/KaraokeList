import { Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { MediaService } from '@/graphql/media/media.service';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';
import { ServerID } from '@/common/decorators/server.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';

@Resolver(() => ArtistModel)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => [ArtistModel])
  async artists(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ArtistModel[]> {
    return await this.mediaService.find_artist_all({ server_id, i18n });
  }

  @ResolveField(() => [TrackModel])
  async tracks_artist(
    @Parent() artist: ArtistModel,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackModel[]> {
    return await this.mediaService.find_track_from_artist(artist.id, {
      server_id,
      i18n,
    });
  }

  @Query(() => [TrackModel])
  async tracks(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackModel[]> {
    return await this.mediaService.find_track_all({ server_id, i18n });
  }
}
