import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { config } from '@/config';
import { User } from '@/db/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  public async generateTokens(user: User) {
    const payload = { email: user.email, sub: user.id };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: config.jwt.accessTokenTtl,
        secret: config.jwt.secret,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: config.jwt.refreshTokenTtl,
        secret: config.jwt.secret,
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
