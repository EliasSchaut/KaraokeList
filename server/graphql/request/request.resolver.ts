import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { RequestService } from '@/graphql/request/request.service';
import { RequestModel } from '@/types/models/request.model';
import { AuthGuard } from '@/graphql/auth/auth.admin.guard';
import { TrackInputModel } from '@/types/models/inputs/track.input';

@Resolver(() => RequestModel)
export class RequestResolver {
  constructor(private readonly requestService: RequestService) {}

  @Query(() => [RequestModel], {
    name: 'requests',
  })
  async find_many(
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<RequestModel[]> {
    return this.requestService.find_many({ i18n });
  }

  @Mutation(() => RequestModel, {
    name: 'request_create',
  })
  async create(
    @Args('track_input_data') request: TrackInputModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<RequestModel> {
    return this.requestService.create(request, { i18n });
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RequestModel, {
    name: 'request_delete',
  })
  async delete(
    @Args('id') id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<RequestModel> {
    return this.requestService.delete(id, { i18n });
  }
}
