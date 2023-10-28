import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Discipline } from '@prisma/client';

import { DisciplineGatewayInterface } from './gateways/discipline-bd/discipline-gateway-interface';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { Pagination } from 'src/utils/pagination';
import { ActivityService } from 'src/activity/activity.service';

@Injectable()
export class DisciplineService {
  constructor(
    @Inject("DisciplineGatewayBD")
    private disciplineGateway: DisciplineGatewayInterface,
    private activityService: ActivityService
  ) { }

  async create(idUserLog: number, createDisciplineDto: CreateDisciplineDto) {
    createDisciplineDto.userId = idUserLog

    return this.disciplineGateway.create(createDisciplineDto);
  }

  async findAll(idUser: number, page?: number, limit?: number, status?: string, partialName?: string, ascend = false) {
    if (typeof (page) === 'number' && typeof (limit) === 'number') {

      if (page < 1)
        throw new BadRequestException(`O page deve ser um número positivo`)

      if (limit < 1)
        throw new BadRequestException(`O limit deve ser um número positivo`)

      const count = await this.disciplineGateway.count(idUser, status, partialName);
      const data = await this.disciplineGateway.findAllWithPagination(idUser, (page - 1), limit, status, partialName, ascend);

      return new Pagination<Discipline>(data, page, limit, count);
    }
    else {
      const data = await this.disciplineGateway.findAll(idUser, status, partialName, ascend);

      return new Pagination<Discipline>(data, 1, data.length, data.length);
    }
  }

  async update(idUserLog: number, id: number, updateDisciplineDto: UpdateDisciplineDto) {
    await this.findOne(idUserLog, id);

    const disciplineUpdated = await this.disciplineGateway.update(id, updateDisciplineDto);

    return disciplineUpdated;
  }

  async remove(idUserLog: number, id: number) {
    await this.findOne(idUserLog, id);

    await this.disciplineGateway.remove(id);
  }

  async findOne(idUserLog: number, id: number) {
    const discipline = await this.disciplineGateway.findById(id)

    if (!discipline || discipline.userId !== idUserLog)
      throw new NotFoundException(`discipline de id ${id} não encontrado`)

    return discipline
  }

  async off(idUserLog: number, idDiscipline: number){
    await this.findOne(idUserLog, idDiscipline);
    await this.disciplineGateway.off(idDiscipline);

  }

  async calcNoteByDisciplineId(idUserLog: number, disciplineId: number){
    const listPaginationActivity = await this.activityService.findAll(idUserLog, disciplineId);
    let listActivity = listPaginationActivity.data;

    listActivity = listActivity.filter(activity => activity.note !== null)

    const acumulatorNote = listActivity.reduce((acumulator, current) => {
      return acumulator + current.note * current.weight;
    }, 0)

    const acumulatorWeight = listActivity.reduce((acumulator, current) => {
      return acumulator + current.weight;
    }, 0)

    const currentNote = acumulatorNote / acumulatorWeight;
    

    await this.disciplineGateway.updateNote(disciplineId, currentNote)
  }
}
