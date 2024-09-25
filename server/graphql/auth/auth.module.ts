import { Module } from '@nestjs/common';
import { AuthService } from '@/graphql/auth/auth.service';
import { AuthResolver } from '@/graphql/auth/auth.resolver';
import { I18nLangResolver } from '@/common/middleware/i18n.resolver';

@Module({
  providers: [AuthService, AuthResolver, I18nLangResolver],
})
export class AuthModule {}
