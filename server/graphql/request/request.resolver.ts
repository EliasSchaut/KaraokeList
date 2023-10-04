import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ServerID } from '@/common/decorators/server.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { RequestService } from '@/graphql/request/request.service';
import { RequestModel } from '@/types/models/request.model';
import { AdminGuard } from '@/graphql/auth/auth.admin.guard';
import { TrackInputModel } from '@/types/models/inputs/track.input';

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
    @Args('track_input_data') request: TrackInputModel,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<RequestModel> {
    return this.requestService.create(request, { server_id, i18n });
  }

  @UseGuards(AdminGuard)
  @Resolver(() => RequestModel)
  async request_delete(
    @Args('id') id: number,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<RequestModel> {
    return this.requestService.delete(id, { server_id, i18n });
  }
}
