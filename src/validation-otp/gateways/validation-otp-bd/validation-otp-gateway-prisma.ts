import { Injectable } from '@nestjs/common';
import { ValidationOtpGatewayInterface } from "./validation-otp-gateway-interface";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class ValidationOtpGatewayPrisma implements ValidationOtpGatewayInterface{

    constructor(private prisma: PrismaService){}

    async generate(otp: number, userId: number): Promise<void> {

        const exist = await this.existByIdUser(userId);

        if(exist){
            await this.prisma.validationOtp.update({
                where: {
                    userId
                },
                data: {
                    otp
                }
            })
        }else{
            await this.prisma.validationOtp.create({
                data: {
                    otp,
                    userId
                }
            })
        }
    }

    private async existByIdUser(idUser: number): Promise<boolean>{
        const validationOtp = await this.prisma.validationOtp.findUnique({
            where: {
                userId: idUser
            }
        });

        return validationOtp? true: false;
    }

}