import { IsDate, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty({message: `name não pode ser vazio`})
    @IsString({message: `name deve ser uma string`})
    @MinLength(2, {message: `name deve ter um tamanho maior ou igual a 2 caracteres`})
    name: string;

    @IsNotEmpty({message: `description não pode ser vazio`})
    @IsString({message: `description deve ser uma string`})
    @MinLength(2, {message: `description deve ter um tamanho maior ou igual a 2 caracteres`})
    description: string;

    @IsNotEmpty({message: `dateStart não pode ser vazio`})
    @IsDate({message: `dateStart deve ser uma data válida`})
    dateStart: Date;

    @IsNotEmpty({message: `dateStart não pode ser vazio`})
    @IsDate({message: `dateStart deve ser uma data válida`})
    dateWishEnd: Date;

    @IsNotEmpty({message: `userId não pode ser vazio`})
    @IsNumber({}, {message: `userId deve ser um número`})
    userId: number;
}
