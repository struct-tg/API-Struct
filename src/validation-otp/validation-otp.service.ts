import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { GenerateOtp } from './dto/generate-otp.dto';
import { UserService } from 'src/user/user.service';
import { ValidationOtpGatewayInterface } from './gateways/validation-otp-bd/validation-otp-gateway-interface';
import { ChangePassword } from './dto/new-password.dto';
import * as moment from 'moment';
import { ValidationOtpGatewayEmailInterface } from './gateways/validation-otp-email/validation-otp-gateway-email-interface';

@Injectable()
export class ValidationOtpService {
    constructor(
        @Inject('ValidationOtpGatewayBD')
        private validationOtpGateway: ValidationOtpGatewayInterface,
        @Inject('ValidationOtpGatewayEmail')
        private validationOtpGatewayEmail: ValidationOtpGatewayEmailInterface,
        private userService: UserService
    ){}
    
    async generateOtp(generateOtp: GenerateOtp){
        const { email } = generateOtp;
        const user = await this.userService.findByEmail(email);

        const maxIntPlace = 6;
        const baseToIntOtp = Math.pow(10, maxIntPlace);
        const otp = Math.floor(Math.random() * baseToIntOtp);


        await Promise.all([
            this.validationOtpGateway.generate(otp, user.id),
            this.validationOtpGatewayEmail.send(email, otp)
        ])
    }

    async verifyOtp(otp: number){
        const now = moment(new Date());

        const validation = await this.validationOtpGateway.verify(otp);

        if(!validation)
            throw new NotFoundException(`Código OTP não encontrado`);
    
        let expiredValidation = moment(validation.updated);
        expiredValidation.add(1, 'hour');
    
        if(now.isAfter(expiredValidation))            
            throw new BadRequestException(`Código OTP expirado`);
        
        return validation;
    }

    async changePassword(newPassword: ChangePassword){
        const { password, otp } = newPassword;
        const validation = await this.verifyOtp(otp);
        this.userService.changePassword(password, validation.userId);
    }
}
