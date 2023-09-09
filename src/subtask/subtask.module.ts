import { Module } from '@nestjs/common';
import { SubTaskService } from './subtask.service';
import { SubTaskGatewayPrisma } from './gateways/subtask-bd/sub-task-gateway-prisma';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule
  ],
  providers: [
    SubTaskService,
    SubTaskGatewayPrisma,
    {
      provide: 'SubTaskGatewayBd',
      useExisting: SubTaskGatewayPrisma
    }
  ],
  exports: [SubTaskService]
})
export class SubtaskModule {}
