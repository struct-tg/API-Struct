import { Discipline, StatusDiscipline, Task } from "@prisma/client";
import { Injectable } from "@nestjs/common";

import { CreateDisciplineDto } from "src/discipline/dto/create-discipline.dto";
import { UpdateDisciplineDto } from "src/discipline/dto/update-discipline.dto";
import { DisciplineGatewayInterface } from "./discipline-gateway-interface";
import { PrismaService } from "src/prisma/prisma.service";


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

        const disciplineList = await this.prisma.discipline.findMany({
            where: filter,
            // orderBy: order
        })

        return disciplineList;
    }

    async findAllWithPagination(idUser: number, page: number, limit: number, status: string, partialName: string, ascend: boolean): Promise<Discipline[]>{
    
        const filter = this.genereateFilter(idUser, status, partialName);    

        const disciplineList = await this.prisma.discipline.findMany({
            where: filter,
            // orderBy: order,
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

    async update(id: number, updateDisciplineDto: UpdateDisciplineDto): Promise<Discipline>{

        const { activity, ...onlyDiscipline } = updateDisciplineDto;

        const discipline = await this.prisma.discipline.update({
            data: onlyDiscipline,
            where: {
                id
            }
        })

        return discipline;
    }

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

        switch(status){
            case StatusDiscipline.APPROVED:
                Object.assign(filter, {
                    status: StatusDiscipline.APPROVED
                })
                break;
            case StatusDiscipline.DISAPPROVED:
                Object.assign(filter, { 
                    status: StatusDiscipline.DISAPPROVED
                })
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
}