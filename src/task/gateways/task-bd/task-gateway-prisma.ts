import { Injectable } from "@nestjs/common";
import { TaskGatewayInterface } from "./task-gateway-interface";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { Task } from "src/task/entities/task.entity";
import { TaskController } from "src/task/task.controller";
import { UpdateTaskDto } from "src/task/dto/update-task.dto";

@Injectable()
export class TaskGatewayPrisma implements TaskGatewayInterface{

    constructor(
        private prisma: PrismaService
    ){}

    async create(createTaskDto: CreateTaskDto): Promise<Task>{
        const taskCreated = await this.prisma.task.create({
            data: createTaskDto
        })

        return taskCreated;
    }

    async findAll(idUser: number): Promise<Task[]> {
        const taskList = await this.prisma.task.findMany({
            where: {
                userId: idUser
            }
        })

        return taskList;
    }

    async findById(id: number): Promise<Task> {
        const task = await this.prisma.task.findUnique({
          where: {
            id
          }
        })
  
        return task;
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>{
        const task = await this.prisma.task.update({
            data: updateTaskDto,
            where: {
                id
            }
        })

        return task;
    }

    async onOff(id: number, dateEnd: Date): Promise<void>{
        await this.prisma.task.update({
            data: {
                dateEnd
            },
            where: {
                id
            }
        })
    }

    async remove(id: number): Promise<void>{
        await this.prisma.task.delete({
            where: {
                id
            }
        })
    }
}