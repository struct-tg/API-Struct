import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateSubtaskDto {
    @IsNotEmpty({message: `description não pode ser vazio`})
    @IsString({message: `description deve ser uma string`})
    @MinLength(2, {message: `description deve ter um tamanho maior ou igual a 2 caracteres`})
    description: string;

    @IsNotEmpty({message: `description não pode ser vazio`})
    @IsNumber({},{message: `taskId deve ser um número`})
    taskId: number;
}
