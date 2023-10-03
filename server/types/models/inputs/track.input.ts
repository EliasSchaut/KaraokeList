import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TrackInputModel {
  @Field(() => String, {
    description: 'Name of artist to request',
  })
  artist_name!: string;

  @Field(() => String, {
    description: 'Name of track to request',
  })
  track_title!: string;
}
