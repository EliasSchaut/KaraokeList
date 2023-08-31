import {
  Query,
  Resolver,
  ResolveField,
  Parent,
  Args,
  Int,
} from '@nestjs/graphql';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { ServerID } from '@/common/decorators/server.decorator';
import { TrackService } from '@/graphql/track/track.service';
import { TrackMetadataModel } from '@/types/models/track_metadata.model';

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

  @Query(() => TrackModel)
  async track(
    @Args('track_id', { type: () => Int }) id: number,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackModel> {
    return await this.trackService.find_track(id, { server_id, i18n });
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

  @ResolveField(() => String)
  async track_artists_names(
    @Parent() track: TrackModel,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<String> {
    return await this.trackService.find_artists_names_of_track(track.id, {
      server_id,
      i18n,
    });
  }

  @ResolveField(() => Boolean)
  async reported(
    @Parent() track: TrackModel,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<Boolean> {
    return await this.trackService.is_reported(track.id, {
      server_id,
      i18n,
    });
  }

  @ResolveField(() => TrackMetadataModel)
  async metadata(
    @Parent() track: TrackModel,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackMetadataModel> {
    return await this.trackService.find_metadata(track.id, {
      server_id,
      i18n,
    });
  }
}
