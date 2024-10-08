import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Server Information',
})
export class ServerModel {
  @Field(() => Int, {
    description: 'Unique id number of server used for comparison',
    nullable: true,
  })
  id?: number;

  @Field(() => String, {
    description: 'Visible title of the server',
    nullable: true,
  })
  title?: string;

  @Field(() => String, {
    description: 'Unique name of the server',
    nullable: true,
  })
  name?: string;

  @Field(() => String, {
    description: 'Description of the server',
    nullable: true,
  })
  desc?: string;
}
