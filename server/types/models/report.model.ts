import { Field, ObjectType } from '@nestjs/graphql';
import { TrackModel } from '@/types/models/track.model';

@ObjectType({
  description: 'Report Model',
})
export class ReportModel {
  @Field(() => Number, {
    description: 'Unique id number of report used for comparison',
  })
  id!: number;

  @Field(() => String, {
    description: 'Reason for reporting track',
  })
  desc!: string;

  @Field(() => TrackModel, {
    description: 'Track to report',
    nullable: true,
  })
  report_track?: TrackModel;
}
