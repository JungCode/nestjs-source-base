import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

import { IsUnique } from '@/common/decorators/unique.decorator';
import { User } from '@/db/entities/user.entity';

// -------- Response ---------

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@ObjectType()
export class LogoutResponse {
  @Field()
  success: boolean;
}

@ObjectType()
export class RefreshTokenResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

// --------- Input ---------

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsUnique({ column: 'email', entity: User })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'Username should not be empty' })
  @IsUnique({ column: 'userName', entity: User })
  userName: string;
}

@InputType()
export class LogoutInput {
  @Field()
  @IsNotEmpty({ message: 'Refresh token should not be empty' })
  userId: string;
}

@InputType()
export class RefreshTokenInput {
  @Field()
  @IsNotEmpty({ message: 'Refresh token should not be empty' })
  refreshToken: string;
}
