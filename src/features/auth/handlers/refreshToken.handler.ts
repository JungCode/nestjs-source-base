import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { config } from '@/config';
import { User } from '@/db/entities/user.entity';

import { AuthService } from '../core/auth.service';

export class RefreshTokensCommand {
  constructor(
    public readonly userId: string,
    public readonly refreshToken: string,
  ) {}
}

@CommandHandler(RefreshTokensCommand)
export class RefreshTokensHandler implements ICommandHandler<RefreshTokensCommand> {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private authService: AuthService,
  ) {}

  async execute(command: RefreshTokensCommand) {
    const { refreshToken, userId } = command;

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user?.refreshToken) throw new UnauthorizedException('Access denied');

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) throw new UnauthorizedException('Access denied');

    const tokens = await this.authService.generateTokens(user);

    await this.userRepo.update(user.id, {
      refreshToken: await bcrypt.hash(
        tokens.refreshToken,
        Number(config.bcrypt.salt),
      ),
    });

    return tokens;
  }
}
