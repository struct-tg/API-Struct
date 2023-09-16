import { PrismaService } from "src/prisma/prisma.service";
import { PomodoroGatewayInterface } from "./pomodoro-gateway-interface";
import { CreatePomodoroDto } from "src/pomodoro/dto/create-pomodoro.dto";
import { Pomodoro } from "src/pomodoro/entities/pomodoro.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PomodoroGatewayPrisma implements PomodoroGatewayInterface{
    constructor(
        private prisma: PrismaService
    ){}

    async create(createPomodoroDto: CreatePomodoroDto): Promise<Pomodoro> {
        const pomodoro = await this.prisma.pomodoro.create({
            data: createPomodoroDto
        })

        return pomodoro;
    }

    async findAll(idUser: number): Promise<Pomodoro[]> {
        const listPomodoro = await this.prisma.pomodoro.findMany({
            where: {
                userId: idUser
            }
        })

        return listPomodoro;
    }
}