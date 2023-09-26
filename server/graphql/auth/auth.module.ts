import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@/graphql/auth/auth.service';
import { PrismaService } from '@/common/db/prisma.service';
import { AuthResolver } from '@/graphql/auth/auth.resolver';
import { AuthGuard } from '@/graphql/auth/auth.guard';
import { PasswordService } from '@/common/util/password.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION as string },
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthResolver,
    PrismaService,
    PasswordService,
  ],
})
export class AuthModule {}
