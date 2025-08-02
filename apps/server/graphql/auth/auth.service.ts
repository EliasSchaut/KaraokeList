import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '@/common/services/password.service';
import { PrismaService } from 'nestjs-prisma';
import { AuthInputModel } from '@/types/models/inputs/auth.input';
import { CtxType } from '@/types/common/ctx.type';
import { AuthModel } from '@/types/models/auth.model';
import { ForbiddenException } from '@/common/exceptions/forbidden.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async sign_in(
    auth_input_data: AuthInputModel,
    ctx: CtxType,
  ): Promise<AuthModel> {
    const user = await this.prisma.admin.findUnique({
      where: {
        username: auth_input_data.username,
      },
    });

    if (
      user === null ||
      !(await PasswordService.compare(auth_input_data.password, user.password))
    ) {
      throw new ForbiddenException(ctx.i18n.t('exceptions.forbidden.login'));
    }

    const payload = { username: user.id, sub: null };
    return {
      barrier_token: await this.jwtService.signAsync(payload),
    } as AuthModel;
  }
}
