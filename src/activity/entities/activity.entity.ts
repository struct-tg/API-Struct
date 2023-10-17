export class Activity {
    id: number;
    description?: string;
    date: Date;
    note: number;
    weight?: number;
    typeAc: string;
    comment?: string;
    name: string;
    disciplineId: number;

    constructor(partial: Partial<Activity>){
        Object.assign(this, partial);
    }
}
