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

    async count(disciplineId: number, typeAc: string, partialName: string): Promise<number>{

        const filter = this.genereateFilter(disciplineId, typeAc, partialName);

        const count = await this.prisma.activity.count({
            where: filter
        })

        return count
    }

    async findAll(disciplineId: number, typeAc?: string, partialName?: string, ascend?: boolean): Promise<Activity[]> {

        const filter = this.genereateFilter(disciplineId, typeAc, partialName);
        const order = this.generateOrder(ascend);
        
        const activityList = await this.prisma.activity.findMany({
            where: filter,
            orderBy: order
        })

        return activityList;
    }

    async findAllWithPagination(disciplineId: number, page: number, limit: number, typeAc: string, partialName: string, ascend?: boolean): Promise<Activity[]>{
    
        const filter = this.genereateFilter(disciplineId, typeAc, partialName);    
        const order = this.generateOrder(ascend);

        const activityList = await this.prisma.activity.findMany({
            where: filter,
            orderBy: order,
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

    private genereateFilter(disciplineId: number, typeAc?: string, partialName?: string){
        let filter: any = {}
        filter = { disciplineId: disciplineId}      

        switch(typeAc){
            case TypeActivity.ACTIVITY:
                Object.assign(filter, {
                    typeAc: TypeActivity.ACTIVITY
                })
                break;
            case TypeActivity.EXAMINATION:
                Object.assign(filter, { 
                    typeAc: TypeActivity.EXAMINATION
                })
                break;
            case TypeActivity.WORK:
                Object.assign(filter, { 
                    typeAc: TypeActivity.WORK
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

    private generateOrder(ascend: boolean){
        const order = ascend ? "asc" : "desc";
        const orderList: any[] = [
            {
                date: order
            },
            {
                name: "asc"
            }
        ]

        return orderList;
    }
}