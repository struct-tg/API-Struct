import { Module } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { DisciplineController } from './discipline.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ActivityModule } from 'src/activity/activity.module';
import { DisciplineGatewayPrisma } from './gateways/discipline-bd/discipline-gateway-prisma';

@Module({
  imports: [
    PrismaModule,
    ActivityModule
  ],
  controllers: [DisciplineController],
  providers: [
    DisciplineService,
    DisciplineGatewayPrisma,
    {
      provide: 'DisciplineGatewayBD',
      useExisting: DisciplineGatewayPrisma
    }
  ],
  exports: [DisciplineModule]
})
export class DisciplineModule {}
