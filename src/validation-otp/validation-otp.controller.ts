import { Controller } from '@nestjs/common';
import { ValidationOtpService } from './validation-otp.service';

@Controller('validation-otp')
export class ValidationOtpController {
  constructor(private readonly validationOtpService: ValidationOtpService) {}

  
}
