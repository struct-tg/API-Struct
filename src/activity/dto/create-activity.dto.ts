import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MinLength 
} from "class-validator";
import { TypeActivity } from "../enums/activity-type";

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

    @IsNotEmpty({message: 'TypeActivity não pode ser vazio'})
    @IsEnum(TypeActivity)
    typeAc: TypeActivity;

    @IsOptional()
    @IsString({message: `comment deve ser uma string`})
    comment: string;
    
    @IsNotEmpty({message: `name não pode ser vazio`})
    @IsString({message: `name deve ser uma string`})
    @MinLength(2, {message: `name deve ter um tamanho maior ou igual a 2 caracteres`})
    name: string;

    @IsNotEmpty({message: `disciplineId não pode ser vazio`})
    @IsNumber({}, {message: 'disciplineId deve ser um número'})
    disciplineId: number;
}
