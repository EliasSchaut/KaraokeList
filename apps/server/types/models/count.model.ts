import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountModel {
  @Field(() => Number)
  count!: number;

  @Field(() => Number, { nullable: true })
  total_pages?: number;
}
