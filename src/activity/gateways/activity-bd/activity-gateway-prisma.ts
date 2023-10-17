import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { ActivityGatewayInterface } from "./activity-gateway-interface";
import { Activity } from "@prisma/client";
import { CreateActivityDto } from "src/activity/dto/create-activity.dto";
import { TypeActivity } from "src/activity/enums/activity-type";
import { UpdateActivityDto } from "src/activity/dto/update-activity.dto";


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

    async count(activity: number, partialName: string, tipeAc: string): Promise<number>{

        const filter = this.genereateFilter(activity, partialName, tipeAc);

        const count = await this.prisma.task.count({
            where: filter
        })

        return count
    }

    async findAll(activity: number, partialName: string, tipeAc: string): Promise<Activity[]> {

        const filter = this.genereateFilter(activity, partialName, tipeAc);

        const activityList = await this.prisma.activity.findMany({
            where: filter,
        })

        return activityList;
    }

    async findAllWithPagination(activity: number, page: number, limit: number, partialName: string, tipeAc: string): Promise<Activity[]>{
    
        const filter = this.genereateFilter(activity, partialName, tipeAc);    

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

    private genereateFilter(disciplineId: number, status?: string, partialName?: string){
        let filter: any = {}
        filter = { userId: disciplineId}      

        switch(status){
            case TypeActivity.ACTIVITY:
                Object.assign(filter, {
                    status: TypeActivity.ACTIVITY
                })
                break;
            case TypeActivity.EXAMINATION:
                Object.assign(filter, { 
                    status: TypeActivity.EXAMINATION
                })
                break;
            case TypeActivity.WORK:
                Object.assign(filter, { 
                    status: TypeActivity.WORK
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