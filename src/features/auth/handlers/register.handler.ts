import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { config } from '@/config';
import { User } from '@/db/entities/user.entity';

export class RegisterCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly userName: string,
  ) {}
}

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async execute({ email, password, userName }: RegisterCommand) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt.salt),
    );

    const user = this.userRepo.create({
      email,
      password: hashedPassword,
      userName,
    });

    return this.userRepo.save(user);
  }
}
