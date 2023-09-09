import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';

@Module({
  providers: [SubtaskService],
  exports: [SubtaskService]
})
export class SubtaskModule {}
