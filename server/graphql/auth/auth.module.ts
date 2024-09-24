import { Module } from '@nestjs/common';
import { AuthService } from '@/graphql/auth/auth.service';
import { AuthResolver } from '@/graphql/auth/auth.resolver';
import { PasswordService } from '@/common/services/password.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/graphql/auth/auth.admin.guard';
import { I18nLangResolver } from '@/common/middleware/i18n.resolver';

@Module({
  providers: [
    AuthService,
    AuthResolver,
    PasswordService,
    I18nLangResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
