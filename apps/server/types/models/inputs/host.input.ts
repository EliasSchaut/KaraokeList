import { Field, InputType } from '@nestjs/graphql';
import { IsUrl } from 'class-validator';

@InputType()
export class HostInputModel {
  @IsUrl()
  @Field(() => String)
  host!: string;
}
