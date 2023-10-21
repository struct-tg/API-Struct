import { CreateActivityDto } from "src/activity/dto/create-activity.dto";
import { UpdateActivityDto } from "src/activity/dto/update-activity.dto";
import { Activity } from "src/activity/entities/activity.entity";

export interface ActivityGatewayInterface{
    create(createActivityDto: CreateActivityDto): Promise<Activity>;
    count(disciplineId: number, typeAc: string, partialName: string): Promise<number>;
    findAll(disciplineId: number, typeAc: string, partialName: string): Promise<Activity[]>;
    findAllWithPagination(disciplineId: number, page: number, limit: number, typeAc: string, partialName: string): Promise<Activity[]>;
    findById(id: number): Promise<Activity>; 
    update(id: number, updateActivityDto: UpdateActivityDto): Promise<Activity>; 
    remove(id: number): Promise<void>;
 }