import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthInputModel {
  @Field(() => String, {
    description: 'Username of user to login',
  })
  username!: string;

  @Field(() => String, {
    description: 'Password of user to login',
  })
  password!: string;
}
