import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthModel {
  @Field(() => String, { description: 'The barrier token', nullable: true })
  barrier_token?: string;
}
