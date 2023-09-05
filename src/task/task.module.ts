import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskGatewayPrisma } from './gateways/task-bd/task-gateway-prisma';
import { UserModule } from 'src/user/user.module';
import { SubtaskModule } from 'src/subtask/subtask.module';

@Module({
  imports: [
    PrismaModule,
    SubtaskModule
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskGatewayPrisma,
    {
      provide: 'TaskGatewayBD',
      useExisting: TaskGatewayPrisma
    }
  ],
})
export class TaskModule {}
