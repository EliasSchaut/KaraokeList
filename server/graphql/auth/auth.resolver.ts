import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthModel } from '@/types/models/auth.model';
import { AuthService } from '@/graphql/auth/auth.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { AuthInputModel } from '@/types/models/inputs/auth.input';

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthModel, { name: 'auth_sign_in' })
  async sign_in(
    @Args('auth_input_data') auth_input_data: AuthInputModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<AuthModel> {
    return await this.authService.sign_in(auth_input_data, {
      i18n,
    });
  }
}
