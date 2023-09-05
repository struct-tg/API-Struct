import { PartialType } from '@nestjs/mapped-types';
import { CreateSubtaskDto } from './create-subtask.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSubtaskDto extends PartialType(CreateSubtaskDto) {
    @IsOptional()
    @IsBoolean({message: `Deve ser um booleano`})
    status: boolean
}
