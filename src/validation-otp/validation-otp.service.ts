import { Injectable } from '@nestjs/common';
import { GenerateOtp } from './dto/generate-otp.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ValidationOtpService {
    constructor(private userService: UserService){}
    
    async generateOtp(generateOtp: GenerateOtp){

        const { email } = generateOtp;
        const userExist = await this.userService.findByEmail(email);

        

        return userExist;
    }
}
