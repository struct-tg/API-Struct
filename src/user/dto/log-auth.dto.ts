import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LogAuth{
    @IsNotEmpty({message: `email não pode ser vazio`})
    @IsEmail({}, {message: `email deve ser um email`})
    @MinLength(8, {message: `email deve ter um tamanho maior ou igual a 8 caracteres`})
    email: string;

    @IsNotEmpty({message: `password não pode ser vazio`})
    @IsString({message: `password deve ser uma string`})
    @MinLength(8, {message: `password deve ter um tamanho maior ou igual a 8 caracteres`})
    password: string;
}