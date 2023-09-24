import { Injectable } from '@nestjs/common';
import { ValidationOtpGatewayInterface } from "./validation-otp-gateway-interface";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class ValidationOtpGatewayPrisma implements ValidationOtpGatewayInterface{

    constructor(private prisma: PrismaService){}

    async generate(otp: number, userId: number): Promise<void> {
        await this.prisma.validationOtp.create({
            data: {
                otp,
                userId
            }
        })
    }
}