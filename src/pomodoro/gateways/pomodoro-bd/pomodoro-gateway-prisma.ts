import { PrismaService } from "src/prisma/prisma.service";
import { PomodoraGatewayInterface } from "./pomodoro-gateway-interface";
import { CreatePomodoroDto } from "src/pomodoro/dto/create-pomodoro.dto";
import { Pomodoro } from "src/pomodoro/entities/pomodoro.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PomodoroGatewayPrisma implements PomodoraGatewayInterface{
    constructor(
        private prisma: PrismaService
    ){}

    async create(createPomodoroDto: CreatePomodoroDto): Promise<Pomodoro> {
        const pomodoro = await this.prisma.pomodoro.create({
            data: createPomodoroDto
        })

        return pomodoro;
    }
}