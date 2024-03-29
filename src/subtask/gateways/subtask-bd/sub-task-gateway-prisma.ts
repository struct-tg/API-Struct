import { Injectable } from "@nestjs/common";
import { Subtask } from "src/subtask/entities/subtask.entity";
import { SubTaskGatewayInterface } from "./sub-task-gateways-interface";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SubTaskGatewayPrisma implements SubTaskGatewayInterface{

    constructor(
        private prisma: PrismaService
    ){}

    async create(listCreateSubtask: Subtask[]): Promise<void> {
        await this.prisma.subTask.createMany({
            data: listCreateSubtask
        })
    }

    async delete(taskId: number): Promise<void> {

        await this.prisma.subTask.deleteMany({
            where: {
                taskId
            }
        })

    }

    async onOffByIdTask(taskId: number): Promise<void> {
        await this.prisma.subTask.updateMany({
            data: {
                status: true
            },
            where: {
                taskId
            }
        })
    }
}