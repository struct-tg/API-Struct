import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { Task } from "src/task/entities/task.entity";

export interface TaskGatewayInterface{
    create(createTaskDto: CreateTaskDto): Promise<Task>;
}