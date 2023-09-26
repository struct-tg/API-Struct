import { Discipline, StatusDiscipline, Task } from "@prisma/client";
import { Injectable } from "@nestjs/common";

import { CreateDisciplineDto } from "src/discipline/dto/create-discipline.dto";
import { DisciplineGatewayInterface } from "./discipline-gateway-interface";
import { PrismaService } from "src/prisma/prisma.service";

// import { Discipline } from "src/discipline/entities/discipline.entity";
// import { DisciplineController } from "src/discipline/discipline.controller";
// import { UpdateDisciplineDto } from "src/discipline/dto/update-discipline.dto";
// import { disciplineStatus } from "src/discipline/enums/discipline-filter-status";

@Injectable()
export class DisciplineGatewayPrisma implements DisciplineGatewayInterface{

    constructor(
        private prisma: PrismaService
    ){}

    async create(createDisciplineDto: CreateDisciplineDto): Promise<Discipline>{

        const { activity, ...onlyDiscipline } = createDisciplineDto;

        const disciplineCreated = await this.prisma.discipline.create({
            data: onlyDiscipline
        })

        return disciplineCreated;
    }

    async count(idUser: number, status: string, partialName: string): Promise<number>{

        const filter = this.genereateFilter(idUser, status, partialName);

        const count = await this.prisma.task.count({
            where: filter
        })

        return count
    }

    async findAll(idUser: number, status: string, partialName: string, ascend: boolean): Promise<Discipline[]> {

        const filter = this.genereateFilter(idUser, status, partialName);
        const order = this.generateOrder(ascend);

        const disciplineList = await this.prisma.discipline.findMany({
            where: filter,
            orderBy: order
        })

        return disciplineList;
    }

    async findAllWithPagination(idUser: number, page: number, limit: number, status: string, partialName: string, ascend: boolean): Promise<Discipline[]>{
    
        const filter = this.genereateFilter(idUser, status, partialName);    
        const order = this.generateOrder(ascend);

        const disciplineList = await this.prisma.discipline.findMany({
            where: filter,
            orderBy: order,
            skip: page * limit,
            take: limit
        })

        return disciplineList;
    }

    async findById(id: number): Promise<Discipline> {
        const discipline = await this.prisma.discipline.findUnique({
          where: {
            id
          },
          include: {
            activity: true
          }
        })
  
        return discipline;
    }

    // async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>{

    //     const { subTasks, ...onlyTask} = updateTaskDto;

    //     const task = await this.prisma.task.update({
    //         data: onlyTask,
    //         where: {
    //             id
    //         }
    //     })

    //     return task;
    // }

    // async onOff(id: number, dateEnd: Date): Promise<void>{
    //     await this.prisma.task.update({
    //         data: {
    //             dateEnd
    //         },
    //         where: {
    //             id
    //         }
    //     })
    // }

    async remove(id: number): Promise<void>{
        await this.prisma.discipline.delete({
            where: {
                id
            }
        })
    }

    private genereateFilter(idUser: number, status?: string, partialName?: string){
        let filter: any = {}
        filter = { userId: idUser}

        const now = new Date();

        now.setUTCHours(now.getUTCHours() - now.getTimezoneOffset() / 60);
        now.setUTCHours(0, 0, 0, 0);       

        switch(status){
            case StatusDiscipline.APPROVED:
                Object.assign(filter, {NOT: {
                    dateEnd: null,
                  }})
                break;
            case StatusDiscipline.DISAPPROVED:
                Object.assign(filter, {dateEnd: null,
                    dateWishEnd: {
                        gte: now
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