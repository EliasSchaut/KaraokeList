import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { QueueService } from '@/graphql/queue/queue.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { QueueInputModel } from '@/types/models/inputs/queue.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/graphql/auth/auth.admin.guard';
import { HostInputModel } from '@/types/models/inputs/host.input';

@Resolver()
export class QueueResolver {
  constructor(private readonly queryService: QueueService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, {
    name: 'queue_start',
  })
  async start_queue(
    @Args('host_input', { type: () => HostInputModel })
    host_input: HostInputModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<boolean> {
    return this.queryService.start_queue(host_input.host, { i18n });
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, {
    name: 'queue_stop',
  })
  async stop_queue(@I18n() i18n: I18nContext<I18nTranslations>) {
    return this.queryService.stop_queue({ i18n });
  }

  @Mutation(() => Boolean, {
    name: 'queue_push',
  })
  async push_to_queue(
    @Args('queue_input', { type: () => QueueInputModel })
    queue_input: QueueInputModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ) {
    return this.queryService.push_to_queue(queue_input, { i18n });
  }
}
