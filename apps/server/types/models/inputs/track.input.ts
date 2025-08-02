import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class TrackInputModel {
  @Length(1, 1000)
  @Field(() => String, {
    description: 'Name of artist to request',
  })
  artist_name!: string;

  @Length(1, 1000)
  @Field(() => String, {
    description: 'Name of track to request',
  })
  track_title!: string;
}
