import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class SearchInputModel {
  @Length(0, 100)
  @Field(() => String)
  track_title!: string;

  @Length(0, 100)
  @Field(() => String)
  artist_name!: string;
}
