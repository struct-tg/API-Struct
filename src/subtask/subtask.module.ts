import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';

@Module({
  providers: [SubtaskService],
})
export class SubtaskModule {}
