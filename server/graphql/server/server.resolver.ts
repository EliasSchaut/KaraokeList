import { Query, Resolver } from '@nestjs/graphql';
import { ServerService } from '@/graphql/server/server.service';
import { ServerModel } from '@/types/models/server.model';
import { ServerID } from '@/common/decorators/server.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';

@Resolver(() => ServerModel)
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @Query(() => ServerModel, {
    name: 'server',
    description: 'Get server Information',
  })
  async server(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ) {
    return this.serverService.find_by_id({ server_id, i18n });
  }
}
