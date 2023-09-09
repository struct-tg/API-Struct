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
}