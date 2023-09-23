import { Controller, Post, Body } from '@nestjs/common';
import { ValidationOtpService } from './validation-otp.service';
import { JwtGuard } from 'src/guards/auth/jwt.guard';
import { GenerateOtp } from './dto/generate-otp.dto';

@Controller('validation-otp')
export class ValidationOtpController {
  constructor(private readonly validationOtpService: ValidationOtpService) {}

  @Post()
  generate(@Body() generateOtp: GenerateOtp){
    return this.validationOtpService.generateOtp(generateOtp);
  }

}
