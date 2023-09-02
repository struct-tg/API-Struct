import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { UpdateTaskDto } from "src/task/dto/update-task.dto";
import { Task } from "src/task/entities/task.entity";

export interface TaskGatewayInterface{
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    count(idUser: number, status: string, partialName: string): Promise<number>;
    findAll(idUser: number, status: string, partialName: string, ascend: boolean): Promise<Task[]>;
    findAllWithPagination(idUser: number, page: number, limit: number, status: string, partialName: string, ascend: boolean): Promise<Task[]>;
    findById(id: number): Promise<Task>; 
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>; 
    onOff(id: number, dateEnd: Date): Promise<void>; 
    remove(id: number): Promise<void>;
}