import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@/graphql/auth/auth.service';
import { PrismaService } from '@/common/services/prisma.service';
import { AuthResolver } from '@/graphql/auth/auth.resolver';
import { AdminGuard } from '@/graphql/auth/auth.admin.guard';
import { PasswordService } from '@/common/services/password.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION as string },
    }),
  ],
  providers: [
    AuthService,
    AdminGuard,
    AuthResolver,
    PrismaService,
    PasswordService,
  ],
})
export class AuthModule {}
