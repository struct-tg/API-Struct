export interface ValidationOtpGatewayEmailInterface{
    send(to: string, otp: number): Promise<void>;
}