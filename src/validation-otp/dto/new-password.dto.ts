import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class ChangePassword{
    @IsNotEmpty({message: `senha não pode ser vazio`})
    @IsString({message: `senha deve ser numérico`})
    @MinLength(8, {message: `senha deve ter mínimo 8 caracteres`})
    password: string;

    @IsNotEmpty({message: `otp não pode ser vazio`})
    @IsNumber({}, {message: `otp deve ser numérico`})
    otp: number;
}