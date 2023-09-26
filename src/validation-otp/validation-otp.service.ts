import { Injectable, Inject } from '@nestjs/common';
import { GenerateOtp } from './dto/generate-otp.dto';
import { UserService } from 'src/user/user.service';
import { ValidationOtpGatewayInterface } from './gateways/validation-otp-bd/validation-otp-gateway-interface';

@Injectable()
export class ValidationOtpService {
    constructor(
        @Inject('ValidationOtpGatewayBD')
        private validationOtpGateway: ValidationOtpGatewayInterface,
        private userService: UserService
    ){}
    
    async generateOtp(generateOtp: GenerateOtp){
        const { email } = generateOtp;
        const user = await this.userService.findByEmail(email);

        const maxIntPlace = 6;
        const baseToIntOtp = Math.pow(10, maxIntPlace);
        const otp = Math.floor(Math.random() * baseToIntOtp);

        await this.validationOtpGateway.generate(otp, user.id)
    }
}
