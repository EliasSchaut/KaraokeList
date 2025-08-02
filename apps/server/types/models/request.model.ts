import { Field, ObjectType } from '@nestjs/graphql';
import { Request } from '@prisma/client';

@ObjectType({
  description: 'Request Model',
})
export class RequestModel {
  constructor(request: Request) {
    this.id = request.id;
    this.artist_name = request.artist_name;
    this.track_title = request.track_title;
  }

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
