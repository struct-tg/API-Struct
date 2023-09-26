import { Type } from "class-transformer";
import { 
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MinLength, 
    ValidateNested
} from "class-validator";
import { CreateActivityDto } from "src/activity/dto/create-activity.dto";
import { StatusDiscipline } from "src/discipline/enums/discipline-filter-status"
import { TypeAverageDiscipline } from "src/discipline/enums/discipline-type-average"

export class CreateDisciplineDto {
    @IsNotEmpty({message: 'nameTeacher não pode ser vazio'}) 
    @IsString({message: 'nameTeacher deve ser uma string'})
    @MinLength(3, {message: `nameTeacher deve ter um tamanho maior ou igual a 3 caracteres`})
    nameTeacher: string;

    @IsOptional()
    @IsEnum(StatusDiscipline)
    status: StatusDiscipline;
    
    @IsNotEmpty({message: 'typeAverageDiscipline não pode ser vazio'})
    @IsEnum(TypeAverageDiscipline)
    typeAv: TypeAverageDiscipline;

    @IsNotEmpty({message: 'noteMin não pode ser vazio'})
    @IsNumber({maxDecimalPlaces: 2}, {message: 'noteMin deve ser um número'})
    noteMin: number;

    @IsNotEmpty({message: `name não pode ser vazio`})
    @IsString({message: `name deve ser uma string`})
    @MinLength(2, {message: `name deve ter um tamanho maior ou igual a 2 caracteres`})
    name: string;

    @IsOptional({message: `activity deve ser um array`})
    @Type(() => CreateActivityDto)
    @ValidateNested({each: true})
    activity: CreateActivityDto[];

    userId: number;
}
