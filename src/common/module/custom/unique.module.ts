import { Module } from '@nestjs/common';

import { IsUniqueConstraint } from '@/common/constraints/unique.constraint';

@Module({
  exports: [IsUniqueConstraint],
  providers: [IsUniqueConstraint],
})
export class IsUniqueModule {}
