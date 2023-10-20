import { Module } from '@nestjs/common';

import { DisciplineModule } from 'src/discipline/discipline.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivityGatewayPrisma } from './gateways/activity-bd/activity-gateway-prisma';

@Module({
  imports: [
    PrismaModule,
    // DisciplineModule
  ],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    ActivityGatewayPrisma,
    {
      provide: 'ActivityGatewayBD',
      useExisting: ActivityGatewayPrisma
    }
  ],
  exports: [ActivityService]
})
export class ActivityModule {}
