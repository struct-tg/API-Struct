import { Controller, Post, Body, Get, Param, ParseIntPipe, NotAcceptableException, HttpCode, HttpStatus } from '@nestjs/common';
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

  @Get(':otp')
  @HttpCode(HttpStatus.NO_CONTENT)
  verify(
    @Param(
      'otp',
      new ParseIntPipe({
        exceptionFactory: () =>
          new NotAcceptableException(`O otp tem que ser numérico`),
      }),
    )
    otp: number
  ){
    return this.validationOtpService.verifyOtp(otp);
  }

}
