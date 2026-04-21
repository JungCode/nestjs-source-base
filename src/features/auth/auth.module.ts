import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/db/entities/user.entity';

import { AuthService } from './core/auth.service';
import { LoginHandler, RegisterHandler } from './handlers';
import { LogoutHandler } from './handlers/logout.handler';
import { MeHandler } from './handlers/me.handler';
import { RefreshTokensHandler } from './handlers/refreshToken.handler';
import { PrivateAuthResolver } from './resolvers/auth.private.resolver';
import { PublicAuthResolver } from './resolvers/auth.public.resolver';

const CommandHandlers = [
  RegisterHandler,
  LoginHandler,
  LogoutHandler,
  RefreshTokensHandler,
  MeHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CqrsModule,
    JwtModule.register({}),
  ],
  providers: [
    PublicAuthResolver,
    PrivateAuthResolver,
    AuthService,
    ...CommandHandlers,
  ],
})
export class AuthModule {}
