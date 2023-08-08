import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReportInputModel {
  @Field(() => Number, {
    description: 'Track ID of track to report',
  })
  track_id!: number;

  @Field(() => String, {
    description: 'Reason for reporting track',
  })
  desc!: string;
}
