import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MinLength 
} from "class-validator";

export class CreateActivityDto {
    @IsOptional()
    @IsString({message: `description deve ser uma string`})
    description: string;

    @IsNotEmpty({message: `date não pode ser vazio`})
    @IsDateString({}, {message: `date deve ser uma data válida`})
    date: Date;
   
    @IsOptional()
    @IsNumber({maxDecimalPlaces: 2}, {message: 'note deve ser um número'})
    note: number;
    
    @IsOptional()
    @IsNumber({maxDecimalPlaces: 2}, {message: 'weight deve ser um número'})
    weight: number;

    @IsOptional()
    @IsString({message: `comment deve ser uma string`})
    comment: string;
    
    @IsNotEmpty({message: `name não pode ser vazio`})
    @IsString({message: `name deve ser uma string`})
    @MinLength(2, {message: `name deve ter um tamanho maior ou igual a 2 caracteres`})
    name: string;

    disciplineId: number;
}
