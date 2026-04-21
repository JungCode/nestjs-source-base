import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '@/db/entities/user.entity';

import {
  LoginInput,
  LoginResponse,
  RegisterInput,
} from '../core/auth.interface';
import { LoginCommand } from '../handlers/login.handler';
import { RegisterCommand } from '../handlers/register.handler';

@Resolver(() => User)
export class PublicAuthResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Query(() => String)
  checkHealth(): string {
    return 'ok';
  }

  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginInput): Promise<LoginResponse> {
    return this.commandBus.execute(
      new LoginCommand(input.email, input.password),
    );
  }

  @Mutation(() => User)
  async register(@Args('input') input: RegisterInput): Promise<User> {
    return this.commandBus.execute(
      new RegisterCommand(input.email, input.password, input.userName),
    );
  }
}
