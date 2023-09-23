import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ServerID } from '@/common/decorators/server.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { RequestService } from '@/graphql/request/request.service';
import { RequestModel } from '@/types/models/request.model';
import { RequestInputModel } from '@/types/models/inputs/request.input';
import { AuthGuard } from '@/graphql/auth/auth.guard';

@Resolver(() => RequestModel)
export class RequestResolver {
  constructor(private readonly requestService: RequestService) {}

  @Query(() => [RequestModel])
  async requests(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<RequestModel[]> {
    return this.requestService.find_all({ server_id, i18n });
  }

  @Mutation(() => RequestModel)
  async request_create(
    @Args('request') report: RequestInputModel,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<RequestModel> {
    return this.requestService.create(report, { server_id, i18n });
  }

  @UseGuards(AuthGuard)
  @Resolver(() => RequestModel)
  async request_delete(
    @Args('id') id: number,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<RequestModel> {
    return this.requestService.delete(id, { server_id, i18n });
  }
}
