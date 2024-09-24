import { Field, Float, ObjectType } from '@nestjs/graphql';
import { MusicApiType } from '@/types/music/music.type';
import { OmitToMusic } from '@/types/music/music.utils';

@ObjectType({
  description: 'Metadata of the track',
})
export class TrackMetadataModel {
  constructor(metadata: OmitToMusic<MusicApiType>) {
    Object.assign(metadata);
  }

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  track_title?: string;

  @Field(() => [String], {
    description: '',
    nullable: true,
  })
  artists_names?: string[];

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  cover_url?: string;

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  album_title?: string;

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  release_date?: string;

  @Field(() => Float, {
    description: '',
    nullable: true,
  })
  duration_ms?: number;

  @Field(() => Boolean, {
    description: '',
    nullable: true,
  })
  explicit?: boolean;

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  preview_url?: string;

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  external_link?: string;
}
