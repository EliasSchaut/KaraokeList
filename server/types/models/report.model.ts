import { Field, ObjectType } from '@nestjs/graphql';
import { TrackModel } from '@/types/models/track.model';
import { Report } from '@prisma/client';

@ObjectType({
  description: 'Report Model',
})
export class ReportModel {
  constructor(report: Report & { track: TrackModel }) {
    this.id = report.id;
    this.desc = report.desc;
    this.track = report.track;
  }

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
  })
  track!: TrackModel;
}
