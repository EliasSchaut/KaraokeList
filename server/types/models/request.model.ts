import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Request Model',
})
export class RequestModel {
  @Field(() => Number, {
    description: 'Unique id number of request used for comparison',
  })
  id!: number;

  @Field(() => String, {
    description: 'Name of artist to request',
  })
  artist_name!: string;

  @Field(() => String, {
    description: 'Name of track to request',
  })
  track_title!: string;
}
