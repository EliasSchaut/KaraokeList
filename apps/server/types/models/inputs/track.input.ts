import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsUrl, Length, Max, Min } from 'class-validator';

@ObjectType()
export class TrackInputModel {
  @Field()
  id?: number;

  @Length(1, 100)
  @Field()
  artist!: string;

  @Length(1, 100)
  @Field()
  title!: string;

  @Min(0)
  @Max(3000)
  @Field()
  year?: number;

  @Field()
  edition?: string;

  @Field()
  genre?: string;

  @Field()
  tags?: string;

  @Field()
  language?: string;

  @Field()
  golden_notes?: boolean;

  @IsOptional()
  @IsUrl()
  @Field()
  cover_url?: string;

  @IsOptional()
  @IsUrl()
  @Field()
  audio_url?: string;

  @IsOptional()
  @IsUrl()
  @Field()
  video_url?: string;

  @Field()
  duet?: boolean;
}
