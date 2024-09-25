import { Module } from '@nestjs/common';
import { RequestResolver } from '@/graphql/request/request.resolver';
import { RequestService } from '@/graphql/request/request.service';
import { I18nLangResolver } from '@/common/middleware/i18n.resolver';

@Module({
  providers: [RequestResolver, RequestService, I18nLangResolver],
})
export class RequestModule {}
