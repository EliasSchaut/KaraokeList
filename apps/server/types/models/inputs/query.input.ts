import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class QueryInputModel {
  @Length(3, 100)
  @Field(() => String)
  query!: string;
}
