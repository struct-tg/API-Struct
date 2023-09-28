import { CreateDisciplineDto } from "src/discipline/dto/create-discipline.dto";
import { UpdateDisciplineDto } from "src/discipline/dto/update-discipline.dto";
import { Discipline } from "src/discipline/entities/discipline.entity";

export interface DisciplineGatewayInterface{
    create(createDisciplineDto: CreateDisciplineDto): Promise<Discipline>;
    count(idUser: number, status: string, partialName: string): Promise<number>;
    findAll(idUser: number, status: string, partialName: string, ascend: boolean): Promise<Discipline[]>;
    findAllWithPagination(idUser: number, page: number, limit: number, status: string, partialName: string, ascend: boolean): Promise<Discipline[]>;
    findById(id: number): Promise<Discipline>; 
    update(id: number, updateDisciplineDto: UpdateDisciplineDto): Promise<Discipline>; 
    remove(id: number): Promise<void>;
}