import { ValidationOtp } from "@prisma/client";
import { User } from "src/user/entities/user.entity";

export interface ValidationOtpGatewayInterface{
    generate(otp: number, userId: number): Promise<void>;
    verify(otp: number): Promise<ValidationOtp>;
}