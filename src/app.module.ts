import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './configs';
import { AuthModule } from './guards/auth/auth.module';
import { TaskModule } from './task/task.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';
import { ValidationOtpModule } from './validation-otp/validation-otp.module';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    UserModule,
    AuthModule,
    TaskModule,
    PomodoroModule,
    ValidationOtpModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
