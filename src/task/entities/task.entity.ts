import { Subtask } from "src/subtask/entities/subtask.entity";

export class Task {
    id: number;
    name: string;
    description: string;
    dateWishEnd: Date;
    dateEnd: Date;
    userId: number;
    subTasks?: Subtask[];
}
