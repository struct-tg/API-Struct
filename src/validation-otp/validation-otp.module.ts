import { Module } from '@nestjs/common';
import { ValidationOtpService } from './validation-otp.service';
import { ValidationOtpController } from './validation-otp.controller';

@Module({
  controllers: [ValidationOtpController],
  providers: [ValidationOtpService],
})
export class ValidationOtpModule {}
