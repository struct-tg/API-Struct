import { Injectable } from "@nestjs/common";
import { TaskGatewayInterface } from "./task-gateway-interface";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { Task } from "src/task/entities/task.entity";
import { TaskController } from "src/task/task.controller";

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
}