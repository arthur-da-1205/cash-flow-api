import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDto, UserSigninDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async createToken(
    userId: string,
    username: string,
  ): Promise<{ message: string; access_token: string }> {
    const payload = { sub: userId, username };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });

    return { message: 'success', access_token: token };
  }

  async signin(payload: UserSigninDto) {
    if (!payload.username || !payload.username)
      throw new ForbiddenException('Fields cannot be empty');

    const user = await this.prismaService.user.findFirst({
      where: { username: payload.username },
    });
    if (!user) throw new ForbiddenException('Incorect credentials');

    const passwordMatch = await argon.verify(user.hash, payload.password);

    if (!passwordMatch) throw new ForbiddenException('Incorect credentials');

    return this.createToken(user.id, user.username);
  }

  async createUser(payload: UserCreateDto) {
    const requiredFields = ['name', 'username', 'password'];
    const emptyField = requiredFields.find((field) => !payload[field]);

    console.log(payload);

    if (emptyField) {
      throw new ForbiddenException(`Field '${emptyField}' cannot be empty`);
    }

    const hash = await argon.hash(payload.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          name: payload.name,
          username: payload.username,
          hash,
        },
      });

      return this.createToken(user.id, user.username);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials has been taken');
        }

        throw new Error('Something went wrong');
      }
    }
  }
}
