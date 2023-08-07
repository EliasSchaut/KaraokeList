import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ResModel } from '@/types/models/res.model';
import { TrackModel } from '@/types/models/track.model';

@ObjectType({
  description: 'Track Information',
})
export class ArtistModel extends ResModel {
  @Field(() => Int, {
    description: 'Unique id number of track used for comparison',
  })
  id!: number;

  @Field(() => String, {
    description: 'Visible name of the artist',
  })
  name!: string;

  @Field(() => [TrackModel], {
    description: 'Tracks of the artist',
  })
  tracks_artist?: TrackModel[];
}
