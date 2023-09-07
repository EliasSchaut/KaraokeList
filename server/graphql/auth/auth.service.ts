import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '@/common/util/password.service';
import { PrismaService } from '@/common/db/prisma.service';
import { AuthInputModel } from '@/types/models/inputs/auth.input';
import { CtxType } from '@/types/ctx.type';
import { AuthModel } from '@/types/models/auth.model';
import { GraphQLError } from 'graphql/error';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async sign_in(
    auth_input_data: AuthInputModel,
    ctx: CtxType,
  ): Promise<AuthModel> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        server_id_username: {
          username: auth_input_data.username,
          server_id: ctx.server_id,
        },
      },
    });

    if (
      admin === null ||
      !(await this.passwordService.compare(
        auth_input_data.password,
        admin.password,
      ))
    ) {
      throw new GraphQLError(ctx.i18n.t('auth.exception.forbidden_login'));
    }

    const payload = { username: admin.id, sub: null };
    return {
      barrier_token: await this.jwtService.signAsync(payload),
    } as AuthModel;
  }
}
