import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  editHello(): string {
    return 'Hello World! Edited';
  }
}
