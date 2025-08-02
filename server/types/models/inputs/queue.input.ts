import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsPositive, Length } from 'class-validator';

@InputType()
export class QueueInputModel {
  @IsNumber()
  @IsPositive()
  @Field(() => Int, {
    description: 'Track ID of track to add to queue',
  })
  track_id!: number;

  @Length(1, 100)
  @Field(() => String, {
    description: 'Issuer of the queue request',
  })
  issuer!: string;
}
