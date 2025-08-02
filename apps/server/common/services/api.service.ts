import { Injectable } from '@nestjs/common';
import { DangerException } from '@/common/exceptions/danger.exception';
import { I18nContext } from 'nestjs-i18n';
import process from 'node:process';

@Injectable()
export class ApiService {
  private static readonly TIMEOUT_IN_MS: number = Number(
    process.env.API_TIMEOUT_IN_MS,
  );

  public static async call_api(
    url: string,
    options?: {
      timeout_in_ms?: number;
      custom_timeout_error?: string;
      custom_fetch_error?: string;
      fetch_options?: RequestInit;
    },
  ): Promise<any> {
    const timeout_in_ms = options?.timeout_in_ms ?? this.TIMEOUT_IN_MS;
    const custom_fetch_error =
      options?.custom_fetch_error ?? 'common.exception.api_fetch';

    const res: Response = await Promise.race([
      this.create_fetch_timeout({
        timeout_in_ms,
        custom_timeout_error: options?.custom_timeout_error,
      }),
      fetch(url, options?.fetch_options).catch(() => {
        throw new DangerException(I18nContext.current()!.t(custom_fetch_error));
      }),
    ]).catch((e: DangerException) => {
      throw e;
    });
    return await res.json();
  }

  public static create_fetch_timeout(options?: {
    timeout_in_ms?: number;
    custom_timeout_error?: string;
  }): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new DangerException(
            I18nContext.current()!.t(
              options?.custom_timeout_error ?? 'common.exception.api_fetch',
            ),
          ),
        );
      }, options?.timeout_in_ms ?? this.TIMEOUT_IN_MS);
    });
  }
}
