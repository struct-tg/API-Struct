import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { DisciplineGatewayInterface } from './gateways/discipline-bd/discipline-gateway-interface';
import { ActivityService } from 'src/activity/activity.service';
import { Pagination } from 'src/utils/pagination';
import { Discipline } from '@prisma/client';

@Injectable()
export class DisciplineService {
  constructor(
    @Inject("DisciplineGatewayBD")
    private disciplineGateway: DisciplineGatewayInterface,
    private activityService: ActivityService
  ) { }
  
  async create(idUserLog: number, createDisciplineDto: CreateDisciplineDto) {
    createDisciplineDto.userId = idUserLog

    const disciplineCreated = await this.disciplineGateway.create(createDisciplineDto);

    await this.activityService.create(createDisciplineDto.activity, disciplineCreated.id);
    return disciplineCreated
  }

  async findAll(idUser: number, page?: number, limit?: number, status?: string, partialName?: string, ascend = false) {
    if(typeof(page) === 'number' && typeof(limit) === 'number' ){

      if(page < 1)
        throw new BadRequestException(`O page deve ser um número positivo`)

      if(limit < 1)
        throw new BadRequestException(`O limit deve ser um número positivo`)

      const count = await this.disciplineGateway.count(idUser, status, partialName);
      const data = await this.disciplineGateway.findAllWithPagination(idUser, (page - 1), limit, status, partialName, ascend);
      
      return new Pagination<Discipline>(data, page, limit, count);
    }
    else{
      const data = await this.disciplineGateway.findAll(idUser, status, partialName, ascend);

      return new Pagination<Discipline>(data, 1, data.length, data.length);
    }
  }

  async findOne(idUserLog: number, id: number) {
    const discipline = await this.disciplineGateway.findById(id) 

    if(!discipline || discipline.userId !== idUserLog)
      throw new NotFoundException(`discipline de id ${id} não encontrado`)

    return discipline
  }

  update(id: number, updateDisciplineDto: UpdateDisciplineDto) {
    return `This action updates a #${id} discipline`;
  }

  async remove(idUserLog: number, id: number) {
    await this.findOne(idUserLog, id);

    await this.disciplineGateway.remove(id);
  }
}
