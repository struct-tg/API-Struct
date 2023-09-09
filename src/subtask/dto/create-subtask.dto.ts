import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateSubtaskDto {
    @IsNotEmpty({message: `description não pode ser vazio`})
    @IsString({message: `description deve ser uma string`})
    @MinLength(2, {message: `description deve ter um tamanho maior ou igual a 2 caracteres`})
    description: string;

    @IsOptional()
    @IsBoolean({message: `status deve ser um booleano`})
    status = true;
}
