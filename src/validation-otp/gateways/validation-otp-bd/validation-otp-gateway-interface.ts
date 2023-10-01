import { ValidationOtp } from "@prisma/client";
export interface ValidationOtpGatewayInterface{
    generate(otp: number, userId: number): Promise<void>;
    verify(otp: number): Promise<ValidationOtp>;
}