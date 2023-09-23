import { Module } from '@nestjs/common';
import { ValidationOtpService } from './validation-otp.service';
import { ValidationOtpController } from './validation-otp.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PrismaModule,
    UserModule
  ],
  controllers: [ValidationOtpController],
  providers: [ValidationOtpService],
})
export class ValidationOtpModule {}
