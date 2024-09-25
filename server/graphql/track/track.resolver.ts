import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TrackModel } from '@/types/models/track.model';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { TrackService } from '@/graphql/track/track.service';
import { TrackMetadataModel } from '@/types/models/track_metadata.model';
import { TrackInputModel } from '@/types/models/inputs/track.input';
import { AuthGuard } from '@/graphql/auth/auth.admin.guard';
import { SearchInputModel } from '@/types/models/inputs/search.input';
import { CursorInputModel } from '@/types/models/inputs/cursor.input';

@Resolver(() => TrackModel)
export class TrackResolver {
  constructor(private readonly trackService: TrackService) {}

  @Query(() => [TrackModel], {
    name: 'tracks',
  })
  async find_many(
    @Args('cursor', { nullable: true, type: () => CursorInputModel })
    cursor?: CursorInputModel,
  ): Promise<TrackModel[]> {
    return await this.trackService.find_many(cursor);
  }

  @Query(() => TrackModel, {
    name: 'track',
  })
  async find_by_id(
    @Args('track_id', { type: () => Int }) id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackModel> {
    return await this.trackService.find_by_id(id, { i18n });
  }

  @Query(() => [TrackModel], { name: 'tracks_search' })
  async search_artist_or_title(
    @Args('search_query', { type: () => SearchInputModel })
    search_query: SearchInputModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackModel[]> {
    return this.trackService.search(search_query, { i18n });
  }

  @UseGuards(AuthGuard)
  @Mutation(() => TrackModel, {
    name: 'track_create',
  })
  async create(
    @Args('track_input_data') track: TrackInputModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackModel> {
    return await this.trackService.create(track, { i18n });
  }

  @UseGuards(AuthGuard)
  @Mutation(() => [TrackModel], {
    name: 'track_create_multiple',
  })
  async create_many(
    @Args('tracks_input_data', { type: () => [TrackInputModel] })
    tracks: TrackInputModel[],
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackModel[]> {
    return await this.trackService.create_many(tracks, {
      i18n,
    });
  }

  @UseGuards(AuthGuard)
  @Mutation(() => TrackModel, {
    name: 'track_delete',
  })
  async delete(
    @Args('track_id', { type: () => Int }) id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackModel> {
    return await this.trackService.delete(id, { i18n });
  }

  @ResolveField(() => Boolean, {
    name: 'reported',
  })
  async resolve_is_reported(
    @Parent() track: TrackModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<Boolean> {
    return await this.trackService.is_reported(track.id, {
      i18n,
    });
  }

  @ResolveField(() => TrackMetadataModel, {
    name: 'metadata',
  })
  async resolve_metadata(
    @Parent() track: TrackModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackMetadataModel> {
    return await this.trackService.resolve_metadata(track.id, {
      i18n,
    });
  }
}
