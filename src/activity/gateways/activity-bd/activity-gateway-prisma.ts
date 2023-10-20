import { Injectable } from "@nestjs/common";
import { Activity } from "@prisma/client";

import { CreateActivityDto } from "src/activity/dto/create-activity.dto";
import { UpdateActivityDto } from "src/activity/dto/update-activity.dto";
import { ActivityGatewayInterface } from "./activity-gateway-interface";
import { TypeActivity } from "src/activity/enums/activity-type";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class ActivityGatewayPrisma implements ActivityGatewayInterface{
    constructor(
        private prisma: PrismaService
    ){}

    async create(createActivityDto: CreateActivityDto): Promise<Activity>{
        const activityCreated = await this.prisma.activity.create({
            data: createActivityDto
        })

        return activityCreated;
    }

    async count(disciplineId: number, partialName: string, tipeAc: string): Promise<number>{

        const filter = this.genereateFilter(disciplineId, partialName, tipeAc);

        const count = await this.prisma.task.count({
            where: filter
        })

        return count
    }

    async findAll(disciplineId: number, partialName: string, tipeAc: string): Promise<Activity[]> {

        const filter = this.genereateFilter(disciplineId, partialName, tipeAc);

        const activityList = await this.prisma.activity.findMany({
            where: filter,
        })

        return activityList;
    }

    async findAllWithPagination(disciplineId: number, page: number, limit: number, partialName: string, tipeAc: string): Promise<Activity[]>{
    
        const filter = this.genereateFilter(disciplineId, partialName, tipeAc);    

        const activityList = await this.prisma.activity.findMany({
            where: filter,
            skip: page * limit,
            take: limit
        })

        return activityList;
    }

    async findById(id: number): Promise<Activity> {
        const activity = await this.prisma.activity.findUnique({
          where: {
            id
          }
        })
  
        return activity;
    }
    
    async findByDiciplineId(id: number): Promise<Activity> {
        const activity = await this.prisma.activity.findUnique({
          where: {
            id
          }
        })
  
        return activity;
    }

    async update(id: number, updateActivityDto: UpdateActivityDto): Promise<Activity>{
        const activity = await this.prisma.activity.update({
            data: updateActivityDto,
            where: {
                id
            }
        })

        return activity;
    }

    async remove(id: number): Promise<void>{
        await this.prisma.activity.delete({
            where: {
                id
            }
        })
    }

    private genereateFilter(disciplineId: number, partialName?: string, tipeAc?: string){
        let filter: any = {}
        filter = { disciplineId: disciplineId}      

        switch(tipeAc){
            case TypeActivity.ACTIVITY:
                Object.assign(filter, {
                    tipeAc: TypeActivity.ACTIVITY
                })
                break;
            case TypeActivity.EXAMINATION:
                Object.assign(filter, { 
                    tipeAc: TypeActivity.EXAMINATION
                })
                break;
            case TypeActivity.WORK:
                Object.assign(filter, { 
                    tipeAc: TypeActivity.WORK
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