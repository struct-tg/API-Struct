import { Module } from '@nestjs/common';
import { ValidationOtpService } from './validation-otp.service';
import { ValidationOtpController } from './validation-otp.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { ValidationOtpGatewayPrisma } from './gateways/validation-otp-bd/validation-otp-gateway-prisma';
import { ValidationOtpGatewayEmailNodemailer } from './gateways/validation-otp-email/validation-otp-gateway-email-nodemailer';

@Module({
  imports: [
    PrismaModule,
    UserModule
  ],
  controllers: [ValidationOtpController],
  providers: [
    ValidationOtpService,
    ValidationOtpGatewayPrisma,
    ValidationOtpGatewayEmailNodemailer,
    {
      provide: 'ValidationOtpGatewayBD',
      useExisting: ValidationOtpGatewayPrisma
    },
    {
      provide: 'ValidationOtpGatewayEmail',
      useExisting: ValidationOtpGatewayEmailNodemailer
    }
  ],
})
export class ValidationOtpModule {}
