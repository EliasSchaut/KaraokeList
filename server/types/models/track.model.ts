import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackMetadataModel } from '@/types/models/track_metadata.model';
import { Track, Artist } from '@prisma/client';

@ObjectType({
  description: 'Artist Information',
})
export class TrackModel {
  constructor(track: Track & { artist?: Artist }) {
    this.id = track.id;
    this.title = track.title;
    this.artist = track.artist ? new ArtistModel(track.artist) : undefined;
  }

  @Field(() => Int, {
    description: 'Unique id number of track used for comparison',
  })
  id!: number;

  @Field(() => String, {
    description: 'Visible title of the track',
  })
  title!: string;

  @Field(() => ArtistModel, {
    description: 'Artist of the track',
  })
  artist?: ArtistModel;

  @Field(() => Boolean, {
    description: 'Track was reported by someone',
    defaultValue: false,
  })
  reported?: boolean;

  @Field(() => TrackMetadataModel, {
    nullable: true,
  })
  metadata?: TrackMetadataModel;
}
