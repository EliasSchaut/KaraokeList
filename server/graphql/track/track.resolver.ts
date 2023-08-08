import { Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { ServerID } from '@/common/decorators/server.decorator';
import { TrackService } from '@/graphql/track/track.service';

@Resolver(() => TrackModel)
export class TrackResolver {
  constructor(private readonly trackService: TrackService) {}

  @Query(() => [TrackModel])
  async tracks(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackModel[]> {
    return await this.trackService.find_track_all({ server_id, i18n });
  }

  @ResolveField(() => [ArtistModel])
  async track_artists(
    @Parent() track: TrackModel,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ArtistModel[]> {
    return await this.trackService.find_artists_of_track(track.id, {
      server_id,
      i18n,
    });
  }
}
