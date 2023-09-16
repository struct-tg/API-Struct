import { CreatePomodoroDto } from "src/pomodoro/dto/create-pomodoro.dto";
import { Pomodoro } from "src/pomodoro/entities/pomodoro.entity";

export interface PomodoraGatewayInterface{
    create(createPomodoroDto: CreatePomodoroDto): Promise<Pomodoro>;
}