import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class GenerateOtp{
    @IsNotEmpty({message: `email não pode ser vazio`})
    @IsEmail({}, {message: `email deve ser um email`})
    @MinLength(8, {message: `email deve ter um tamanho maior ou igual a 8 caracteres`})
    email: string;
}