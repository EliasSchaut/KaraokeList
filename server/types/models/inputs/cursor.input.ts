import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class CursorInputModel {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Field(() => Int, {
    description: 'Number of items to return',
    nullable: true,
  })
  first?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Field(() => Int, {
    description:
      'Start after this id. If not provided, starts from the beginning',
    nullable: true,
  })
  after?: number;
}
