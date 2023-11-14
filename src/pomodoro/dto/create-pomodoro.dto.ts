import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CreatePomodoroDto {

    @IsNotEmpty({message: `timer não pode ser vazio`})
    @IsNumber({maxDecimalPlaces: 0}, {message: `timer deve ser um número inteiro positivo`})
    @Min(1, {message: `timer deve ser no mínimo 1`})
    timer: number;

    @IsNotEmpty({message: `timerPauseShort não pode ser vazio`})
    @IsNumber({maxDecimalPlaces: 0}, {message: `timerPauseShort deve ser um número inteiro positivo`})
    @Min(1, {message: `timerPauseShort deve ser no mínimo 1`})
    timerPauseShort: number;

    @IsNotEmpty({message: `timerPauseLong não pode ser vazio`})
    @IsNumber({maxDecimalPlaces: 0}, {message: `timerPauseLong deve ser um número inteiro positivo`})
    @Min(1, {message: `timerPauseLong deve ser no mínimo 1`})
    timerPauseLong: number;

    @IsNotEmpty({message: `quantityPauseLong não pode ser vazio`})
    @IsNumber({maxDecimalPlaces: 0}, {message: `quantityPauseLong deve ser um número inteiro positivo`})
    @Min(1, {message: `quantityPauseLong deve ser no mínimo 1`})
    quantityPauseLong: number;

    @IsOptional()
    @IsBoolean({message: `startAutomaticTimer deve ser um booleano`})
    startAutomaticTimer: boolean;

    @IsOptional()
    @IsBoolean({message: `startAutomaticPause deve ser um booleano`})
    startAutomaticPause: boolean;

    userId: number;
}
