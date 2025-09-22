import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ArtistService } from '@/graphql/artist/artist.service';
import { PropertyModel } from '@/types/models/property.model';
import { TrackModel } from '@/types/models/track.model';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';

@Resolver(() => PropertyModel)
export class ArtistResolver {
  constructor(private readonly mediaService: ArtistService) {}

  @Query(() => [PropertyModel], {
    name: 'artists',
  })
  async find_many(
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<PropertyModel[]> {
    return await this.mediaService.find_many({ i18n });
  }

  @ResolveField(() => [TrackModel], {
    name: 'tracks',
  })
  async resolve_tracks(@Parent() artist: PropertyModel): Promise<TrackModel[]> {
    return await this.mediaService.resolve_tracks(artist.id);
  }
}
