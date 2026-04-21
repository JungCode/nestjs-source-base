import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/db/entities/user.entity';

export class GetMeQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetMeQuery)
export class MeHandler implements IQueryHandler<GetMeQuery> {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async execute({ userId }: GetMeQuery) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    return user;
  }
}
