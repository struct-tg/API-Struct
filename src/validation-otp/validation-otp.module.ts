import { Module } from '@nestjs/common';
import { ValidationOtpService } from './validation-otp.service';
import { ValidationOtpController } from './validation-otp.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { ValidationOtpGatewayPrisma } from './gateways/validation-otp-bd/validation-otp-gateway-prisma';

@Module({
  imports: [
    PrismaModule,
    UserModule
  ],
  controllers: [ValidationOtpController],
  providers: [
    ValidationOtpService,
    ValidationOtpGatewayPrisma,
    {
      provide: 'ValidationOtpGatewayBD',
      useExisting: ValidationOtpGatewayPrisma
    }
  ],
})
export class ValidationOtpModule {}
