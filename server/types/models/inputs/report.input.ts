import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, Length } from 'class-validator';

@InputType()
export class ReportInputModel {
  @IsNumber()
  @Field(() => Number, {
    description: 'Track ID of track to report',
  })
  track_id!: number;

  @Length(1, 1000)
  @Field(() => String, {
    description: 'Reason for reporting track',
  })
  desc!: string;
}
