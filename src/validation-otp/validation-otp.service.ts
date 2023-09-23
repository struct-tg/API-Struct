import { Injectable } from '@nestjs/common';
import { GenerateOtp } from './dto/generate-otp.dto';

@Injectable()
export class ValidationOtpService {
    async generateOtp(generateOtp: GenerateOtp){
        return generateOtp;
    }
}
