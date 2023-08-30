import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ArtistModel } from '@/types/models/artist.model';

@ObjectType({
  description: 'Artist Information',
})
export class TrackModel {
  @Field(() => Int, {
    description: 'Unique id number of track used for comparison',
  })
  id!: number;

  @Field(() => String, {
    description: 'Visible title of the track',
  })
  title!: string;

  @Field(() => [ArtistModel], {
    description: 'Artists of the track',
    defaultValue: [],
  })
  track_artists?: ArtistModel[];

  @Field(() => String, {
    description: 'Artists name in single string',
    defaultValue: 'Unknown',
  })
  track_artists_names?: string;

  @Field(() => Boolean, {
    description: 'Track was reported by someone',
    defaultValue: false,
  })
  reported?: boolean;
}
