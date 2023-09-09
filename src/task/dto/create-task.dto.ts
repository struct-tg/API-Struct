import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateSubtaskDto } from "src/subtask/dto/create-subtask.dto";

export class CreateTaskDto {

    @IsNotEmpty({message: `name não pode ser vazio`})
    @IsString({message: `name deve ser uma string`})
    @MinLength(2, {message: `name deve ter um tamanho maior ou igual a 2 caracteres`})
    name: string;

    @IsNotEmpty({message: `description não pode ser vazio`})
    @IsString({message: `description deve ser uma string`})
    @MinLength(2, {message: `description deve ter um tamanho maior ou igual a 2 caracteres`})
    description: string;

    @IsNotEmpty({message: `dateWishEnd não pode ser vazio`})
    @IsDateString({}, {message: `dateWishEnd deve ser uma data válida`})
    dateWishEnd: Date;


    @IsOptional({message: `subTasks deve ser um array`})
    @Type(() => CreateSubtaskDto)
    @ValidateNested({each: true})
    subTasks: CreateSubtaskDto[];

    userId: number;
}
