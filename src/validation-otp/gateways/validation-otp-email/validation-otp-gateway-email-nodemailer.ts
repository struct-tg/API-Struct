import { Injectable, BadRequestException } from "@nestjs/common";
import { ValidationOtpGatewayEmailInterface } from "./validation-otp-gateway-email-interface";
import * as nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";

@Injectable()
export class ValidationOtpGatewayEmailNodemailer implements ValidationOtpGatewayEmailInterface{
    
    private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    }
    
    async send(to: string, otp: number): Promise<void> {
    
        const mailOptions = {
            from: `contato.struct@outlook.com`,
            to,
            subject: `Redefinir Senha`,
            html: `Olá aluno!<br/>Aqui está seu código para redefinir a sua nova senha: <b>${otp}<b/>`
        }
        
        try{
            await this.transporter.sendMail(mailOptions);
        } catch (erro) {
            console.log(erro);
            
            throw new BadRequestException(`Falha ao enviar o e-mail`);
        }
    }
}