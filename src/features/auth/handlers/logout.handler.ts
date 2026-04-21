import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/db/entities/user.entity';

export class LogoutCommand {
  constructor(public readonly userId: string) {}
}

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async execute(command: LogoutCommand) {
    await this.userRepo.update(command.userId, { refreshToken: null });
    return { success: true };
  }
}
