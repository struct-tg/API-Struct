import { Module } from '@nestjs/common';

import { ActivityGatewayPrisma } from './gateways/activity-bd/activity-gateway-prisma';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ActivityService } from './activity.service';

@Module({
  imports: [
    PrismaModule
  ],
  providers: [
    ActivityService,
    ActivityGatewayPrisma,
    {
      provide: 'ActivityGatewayBd',
      useExisting: ActivityGatewayPrisma
    }
  ],
  exports: [ActivityService]
})
export class ActivityModule {}
