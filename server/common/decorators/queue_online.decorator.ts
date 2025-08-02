import { WarningException } from '@/common/exceptions/warning.exception';
import { QueueApiService } from '@/common/services/queue_api/queue_api.service';

export function CheckQueueOnline() {
  return function (
    target: QueueApiService,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]): any {
      if (!target.has_started()) {
        throw new WarningException('Queue is not online');
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
