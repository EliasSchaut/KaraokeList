import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PropertyModel } from '@/types/models/property.model';
import { TrackMetadataModel } from '@/types/models/track_metadata.model';
import { Artist, Genre, Language, Track } from '@prisma/client';

@ObjectType({
  description: 'Artist Information',
})
export class TrackModel {
  constructor(
    track: Track & { artist: Artist; genre: Genre; language: Language },
  ) {
    this.id = track.id;
    this.title = track.title;
    this.artist = new PropertyModel(track.artist);
  }

  @Field(() => Int, {
    description: 'Unique id number of track used for comparison',
  })
  id!: number;

  @Field(() => String, {
    description: 'Visible title of the track',
  })
  title!: string;

  @Field(() => PropertyModel, {
    description: 'Artist of the track',
  })
  artists!: string[];

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
