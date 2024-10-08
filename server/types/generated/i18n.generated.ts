/* DO NOT EDIT, file generated by nestjs-i18n */

import { Path } from 'nestjs-i18n';
export type I18nTranslations = {
  exceptions: {
    not_found: {
      artist: string;
      album: string;
      track: string;
      report: string;
      request: string;
    };
    already_exists: {
      request: string;
      track: string;
    };
    forbidden: {
      login: string;
      no_token: string;
      invalid_token: string;
    };
    music_api: {
      timeout: string;
      error: string;
    };
    db: {
      not_reached: string;
      record_not_found: string;
      record_already_exists: string;
      internal: string;
    };
    internal: string;
  };
};
export type I18nPath = Path<I18nTranslations>;
