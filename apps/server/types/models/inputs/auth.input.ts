import { Field, InputType } from '@nestjs/graphql';
import { IsUsername } from '@/common/validation/decorators/IsUsername.validation';
import { IsPassword } from '@/common/validation/decorators/IsPassword.validation';

@InputType()
export class AuthInputModel {
  @IsUsername()
  @Field(() => String, {
    description: 'Username of user to login',
  })
  username!: string;

  @IsPassword()
  @Field(() => String, {
    description: 'Password of user to login',
  })
  password!: string;
}
