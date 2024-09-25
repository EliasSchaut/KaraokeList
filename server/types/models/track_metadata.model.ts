import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Metadata of the track',
})
export class TrackMetadataModel {
  constructor(metadata: TrackMetadataModel) {
    Object.assign(metadata);
  }

  @Field(() => String, {
    nullable: true,
  })
  track_title?: string;

  @Field(() => [String], {
    nullable: true,
  })
  artists_names?: string[];

  @Field(() => String, {
    nullable: true,
  })
  cover_url?: string;

  @Field(() => String, {
    nullable: true,
  })
  album_title?: string;

  @Field(() => String, {
    nullable: true,
  })
  release_date?: string;

  @Field(() => Float, {
    nullable: true,
  })
  duration_ms?: number;

  @Field(() => Boolean, {
    nullable: true,
  })
  explicit?: boolean;

  @Field(() => String, {
    nullable: true,
  })
  preview_url?: string;

  @Field(() => String, {
    nullable: true,
  })
  external_link?: string;
}
