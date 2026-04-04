import { Tag } from '@/db/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const tag = await Tag.findOneBy({
      id: 'f353ca91-4fc5-49f2-9b9e-304f83d11914',
    });
    return tag?.id || 'Hello World!';
  }
  editHello(): string {
    return 'Hello World! Edited';
  }
}
