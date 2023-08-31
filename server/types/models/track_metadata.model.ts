import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Metadata of the track',
})
export class TrackMetadataModel {
  @Field(() => String, {
    description: '',
    nullable: true,
  })
  name?: string;

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  artists?: string;

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  cover?: string;

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  album?: string;

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  release_date?: string;

  @Field(() => Int, {
    description: '',
    nullable: true,
  })
  duration?: number;

  @Field(() => Boolean, {
    description: '',
    nullable: true,
  })
  explicit?: boolean;

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  spotify_id?: string;

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  spotify_preview?: string;

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  spotify_link?: string;
}
