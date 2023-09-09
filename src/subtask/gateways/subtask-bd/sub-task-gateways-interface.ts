import { CreateSubtaskDto } from "src/subtask/dto/create-subtask.dto";
import { Subtask } from "src/subtask/entities/subtask.entity";

export interface SubTaskGatewayInterface{
    create (listCreateSubtaskDto: Subtask[]): Promise<void>
}