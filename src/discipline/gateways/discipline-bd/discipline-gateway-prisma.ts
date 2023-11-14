import { Discipline } from "@prisma/client";
import { Injectable } from "@nestjs/common";

import { CreateDisciplineDto } from "src/discipline/dto/create-discipline.dto";
import { UpdateDisciplineDto } from "src/discipline/dto/update-discipline.dto";
import { DisciplineGatewayInterface } from "./discipline-gateway-interface";
import { PrismaService } from "src/prisma/prisma.service";
import { StatusDiscipline } from "src/discipline/enums/discipline-filter-status";


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

        const count = await this.prisma.discipline.count({
            where: filter
        })

        return count
    }

    async findAll(idUser: number, status: string, partialName: string, ascend: boolean): Promise<Discipline[]> {

        const filter = this.genereateFilter(idUser, status, partialName);
        
        const disciplineList = await this.prisma.discipline.findMany({
            where: filter,
        })

        return disciplineList;
    }

    async findAllWithPagination(idUser: number, page: number, limit: number, status: string, partialName: string, ascend: boolean): Promise<Discipline[]>{
    
        const filter = this.genereateFilter(idUser, status, partialName);    

        const disciplineList = await this.prisma.discipline.findMany({
            where: filter,
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

    async updateNote(id: number, note: number): Promise<void>{
        await this.prisma.discipline.update({
            data: {
                note
            },
            where: {
                id
            }
        });
    }

    async off(id: number): Promise<void>{   
        await this.prisma.discipline.update({
            data: {
                dateEnd: new Date()
            },
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
                Object.assign(filter, {NOT: {
                    dateEnd: null,
                  },
                  note: {
                    gte: this.prisma.discipline.fields.noteMin
                  }
                })
                break;
            case StatusDiscipline.DISAPPROVED:
                Object.assign(filter, {NOT: {
                    dateEnd: null,
                  },
                  note: {
                    lt: this.prisma.discipline.fields.noteMin
                  }
                })
                break;
            case StatusDiscipline.STUDYING: 
                Object.assign(filter, {
                    dateEnd: null
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