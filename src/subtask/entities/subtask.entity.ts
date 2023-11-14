export class Subtask {
    id: number;
    description: string;
    status: boolean;
    taskId: number;

    constructor(partial: Partial<Subtask>){
        Object.assign(this, partial);
    }
}
