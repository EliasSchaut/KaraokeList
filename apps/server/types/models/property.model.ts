import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TrackModel } from '@/types/models/track.model';

@ObjectType()
export class PropertyModel {
  constructor(property: { id: number; name: string }) {
    this.id = property.id;
    this.name = property.name;
  }

  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => [TrackModel], {
    description: 'Assigned tracks',
    defaultValue: [],
  })
  tracks?: TrackModel[];
}
