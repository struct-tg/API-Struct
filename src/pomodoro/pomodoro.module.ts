import { Module } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { PomodoroController } from './pomodoro.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PomodoroGatewayPrisma } from './gateways/pomodoro-bd/pomodoro-gateway-prisma';

@Module({
  imports: [PrismaModule],
  controllers: [PomodoroController],
  providers: [
    PomodoroService,
    PomodoroGatewayPrisma,
    {
      provide: "PomodoroGateawyBD",
      useExisting: PomodoroGatewayPrisma
    }
  ],
})
export class PomodoroModule {}
