import { Injectable } from "@nestjs/common";
import { TaskGatewayInterface } from "./task-gateway-interface";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { Task } from "src/task/entities/task.entity";
import { TaskController } from "src/task/task.controller";
import { UpdateTaskDto } from "src/task/dto/update-task.dto";
import { TaskStatus } from "src/task/enums/task-filter-status";

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

    async count(idUser: number, status: string, partialName: string): Promise<number>{

        const filter = this.genereateFilter(idUser, status, partialName);

        const count = await this.prisma.task.count({
            where: filter
        })

        return count
    }

    async findAll(idUser: number, status: string, partialName: string, ascend: boolean): Promise<Task[]> {

        const filter = this.genereateFilter(idUser, status, partialName);
        const order = this.generateOrder(ascend);

        const taskList = await this.prisma.task.findMany({
            where: filter,
            orderBy: order
        })

        return taskList;
    }

    async findAllWithPagination(idUser: number, page: number, limit: number, status: string, partialName: string, ascend: boolean): Promise<Task[]>{
    
        const filter = this.genereateFilter(idUser, status, partialName);    
        const order = this.generateOrder(ascend);

        const taskList = await this.prisma.task.findMany({
            where: filter,
            orderBy: order,
            skip: page * limit,
            take: limit
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

    private genereateFilter(idUser: number, status?: string, partialName?: string){
        let filter: any = {}
        filter = { userId: idUser}
        
        const now = new Date();
        now.setUTCHours(0, 0, 0, 0);

        switch(status){
            case TaskStatus.CONCLUIDO:
                Object.assign(filter, {NOT: {
                    dateEnd: null,
                  }})
                break;
            case TaskStatus.NAO_CONCLUIDO:
                Object.assign(filter, {dateEnd: null,
                    dateWishEnd: {
                        gte: now
                    }})
                break;
            case TaskStatus.ATRASADO:
                Object.assign(filter, {dateEnd: null,
                    dateWishEnd: {
                        lt: now
                    }})
                break;
            default:
                break;
        }

        if(partialName){
            Object.assign(filter, {
                name: {
                    contains: partialName
                  }
            })
        }
        
        return filter;
    }

    private generateOrder(ascend: boolean){
        const order = ascend ? "asc" : "desc";
        const orderList: any[] = [
            {
                dateWishEnd: order
            },
            {
                name: "asc"
            }
        ]

        return orderList;
    }
}