import { ExecutionContext, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { EnvValidationSchema } from '@/common/validation/env.validation';
import { I18nLangResolver } from '@/common/middleware/i18n.resolver';
import { ArtistModule } from '@/graphql/artist/artist.module';
import { TrackModule } from '@/graphql/track/track.module';
import { ReportModule } from '@/graphql/report/report.module';
import { AuthModule } from '@/graphql/auth/auth.module';
import { RequestModule } from '@/graphql/request/request.module';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';
import process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvValidationSchema,
    }),
    I18nModule.forRoot({
      fallbackLanguage: process.env.DEFAULT_LANGUAGE as string,
      loaderOptions: {
        path: join(__dirname, 'locales'),
        watch: process.env.NODE_ENV !== 'production',
      },
      loader: I18nJsonLoader,
      resolvers: [I18nLangResolver],
      typesOutputPath: join(
        __dirname,
        'types',
        'generated',
        'i18n.generated.ts',
      ),
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'debug',
          }),
        ],
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      subscriptions: {
        'graphql-ws': true,
      },
      context: (ctx: ExecutionContext) => ctx,
      autoSchemaFile: join(__dirname, 'types', 'generated', 'schema.gql'),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION as string },
    }),
    AuthModule,
    ArtistModule,
    TrackModule,
    ReportModule,
    RequestModule,
  ],
})
export class AppModule {}
