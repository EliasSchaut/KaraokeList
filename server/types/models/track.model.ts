import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ResModel } from '@/types/models/res.model';

@ObjectType({
  description: 'Artist Information',
})
export class TrackModel extends ResModel {
  @Field(() => Int, {
    description: 'Unique id number of track used for comparison',
  })
  id!: number;

  @Field(() => String, {
    description: 'Visible title of the track',
  })
  title!: string;
}
