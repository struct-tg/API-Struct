import { PrismaService } from "src/prisma/prisma.service";
import { PomodoroGatewayInterface } from "./pomodoro-gateway-interface";
import { CreatePomodoroDto } from "src/pomodoro/dto/create-pomodoro.dto";
import { Pomodoro } from "src/pomodoro/entities/pomodoro.entity";
import { Injectable } from "@nestjs/common";
import { UpdatePomodoroDto } from "src/pomodoro/dto/update-pomodoro.dto";

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

    async findById(id: number): Promise<Pomodoro> {
        const pomodoro = await this.prisma.pomodoro.findUnique({
            where: {
                id
            }
        })

        return pomodoro;
    }

    async update(id: number, updatePomodoroDto: UpdatePomodoroDto): Promise<Pomodoro> {
        const pomodoro = await this.prisma.pomodoro.update({
            data: updatePomodoroDto,
            where: {
                id
            }
        });

        return pomodoro;
    }

    async remove(id: number): Promise<void> {
        await this.prisma.pomodoro.delete({
            where: {
                id
            }
        })
    }
}