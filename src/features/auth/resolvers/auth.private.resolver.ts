import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '@/common/decorators/user.decorator';
import { GqlAuthGuard } from '@/common/guards/auth.guard';
import { User } from '@/db/entities/user.entity';

import {
  LogoutInput,
  LogoutResponse,
  RefreshTokenInput,
  RefreshTokenResponse,
} from '../core/auth.interface';
import { LogoutCommand } from '../handlers/logout.handler';
import { GetMeQuery } from '../handlers/me.handler';
import { RefreshTokensCommand } from '../handlers/refreshToken.handler';

@Resolver(() => User)
export class PrivateAuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async me(@CurrentUser('id') userId: string): Promise<User> {
    return this.queryBus.execute(new GetMeQuery(userId));
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LogoutResponse)
  async logout(@Args('input') input: LogoutInput): Promise<LogoutResponse> {
    return this.commandBus.execute(new LogoutCommand(input.userId));
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => RefreshTokenResponse)
  async refreshToken(
    @Args('input') input: RefreshTokenInput,
    @CurrentUser('id') userId: string,
  ): Promise<RefreshTokenResponse> {
    return this.commandBus.execute(
      new RefreshTokensCommand(userId, input.refreshToken),
    );
  }
}
