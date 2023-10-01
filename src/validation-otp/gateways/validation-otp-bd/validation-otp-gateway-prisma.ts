import { Injectable } from '@nestjs/common';
import { ValidationOtpGatewayInterface } from "./validation-otp-gateway-interface";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from 'src/user/entities/user.entity';
import { ValidationOtp } from 'src/validation-otp/entities/validation-otp.entity';


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

    async verify(otp: number): Promise<ValidationOtp> {
        const validation = await this.prisma.validationOtp.findFirst({
            where: {
                otp
            }
        })

        return validation;
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