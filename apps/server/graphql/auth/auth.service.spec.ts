import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '@/common/services/password.service';
import { I18nContext } from 'nestjs-i18n';
import { CtxType } from '@/types/common/ctx.type';
import { Admin } from '@prisma/client';
import { ForbiddenException } from '@/common/exceptions/forbidden.exception';

describe('AuthService', () => {
  let prismaService: PrismaService;
  let authService: AuthService;
  let jwtService: JwtService;
  let ctx: CtxType;

  beforeEach(async () => {
    jest.spyOn(I18nContext, 'current').mockReturnValue({
      t: jest.fn().mockReturnValue('test'),
    } as any);
    ctx = {
      i18n: I18nContext.current()!,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            admin: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sign_in with valid credentials returns SignInModel', async () => {
    const user_data = {
      id: '1',
      username: 'test',
      password: 'password',
    } as Admin;
    jest.spyOn(prismaService.admin, 'findUnique').mockResolvedValue(user_data);
    jest.spyOn(PasswordService, 'compare').mockResolvedValue(true);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

    const result = await authService.sign_in(
      { username: user_data.username, password: user_data.password },
      ctx,
    );

    expect(result).toEqual({ barrier_token: 'token' });
  });

  it('sign_in with invalid email throws WarningException', async () => {
    jest.spyOn(prismaService.admin, 'findUnique').mockResolvedValue(null);

    await expect(
      authService.sign_in(
        {
          username: 'test',
          password: 'password',
        },
        ctx,
      ),
    ).rejects.toThrow(ForbiddenException);
  });

  it('sign_in with invalid password throws WarningException', async () => {
    const user_data = {
      id: '1',
      username: 'test',
      password: 'password',
    } as Admin;
    jest.spyOn(prismaService.admin, 'findUnique').mockResolvedValue(user_data);
    jest.spyOn(PasswordService, 'compare').mockResolvedValue(false);

    await expect(
      authService.sign_in(
        {
          username: user_data.username,
          password: 'wrong_password',
        },
        ctx,
      ),
    ).rejects.toThrow(ForbiddenException);
  });
});
