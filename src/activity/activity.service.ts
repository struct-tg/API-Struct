import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef, ForbiddenException } from '@nestjs/common';

import { ActivityGatewayInterface } from './gateways/activity-bd/activity-gateway-interface';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
import { Pagination } from 'src/utils/pagination';
import { DisciplineService } from 'src/discipline/discipline.service';

@Injectable()
export class ActivityService {
  constructor(
    @Inject("ActivityGatewayBD")
    private activityGateway: ActivityGatewayInterface,
    @Inject(forwardRef(() => DisciplineService))
    private disciplineService: DisciplineService
  ) { }

  async create(idUserLog: number, createActivityDto: CreateActivityDto) {
    const discipline = await this.disciplineService.findOne(idUserLog, createActivityDto.disciplineId);

    if(discipline.dateEnd)
      throw new ForbiddenException(`Disciplina finalizada`);

    createActivityDto.date = new Date(createActivityDto.date);

    const newActivity = await this.activityGateway.create(createActivityDto);    
    await this.disciplineService.calcNoteByDisciplineId(idUserLog, newActivity.disciplineId);

    return newActivity;
  }

  async findAll(idUserLog: number, disciplineId: number, typeAc?: string, page?: number, limit?: number, partialName?: string,  ascend?: boolean) {
    if (typeof (page) === 'number' && typeof (limit) === 'number') {

      await this.disciplineService.findOne(idUserLog, disciplineId); 

      if (page < 1)
        throw new BadRequestException(`O page deve ser um número positivo`);

      if (limit < 1)
        throw new BadRequestException(`O limit deve ser um número positivo`);

      const count = await this.activityGateway.count(disciplineId, typeAc, partialName);
      const date = await this.activityGateway.findAllWithPagination(disciplineId, (page - 1), limit, typeAc, partialName, ascend);

      return new Pagination<Activity>(date, page, limit, count);
    }
    else {
      const date = await this.activityGateway.findAll(disciplineId, typeAc, partialName, ascend);

      return new Pagination<Activity>(date, 1, date.length, date.length);
    }
  }

  async update(idUserLog: number, id: number, updateActivityDto: UpdateActivityDto) {

    const discipline = await this.disciplineService.findOne(idUserLog, updateActivityDto.disciplineId);

    if(discipline.dateEnd)
      throw new ForbiddenException(`Disciplina finalizada`);

    updateActivityDto.date = new Date(updateActivityDto.date)
    await this.findOne(updateActivityDto.disciplineId, id); //

    const activityUpdated = await this.activityGateway.update(id, updateActivityDto);

    await this.disciplineService.calcNoteByDisciplineId(idUserLog, updateActivityDto.disciplineId);

    return activityUpdated;
  }

  async remove(idUserLog: number, disciplineId: number, id: number) {

    const discipline = await this.disciplineService.findOne(idUserLog, disciplineId);

    if(discipline.dateEnd)
      throw new ForbiddenException(`Disciplina finalizada`);
    

    await this.findOne(disciplineId, id);

    await this.activityGateway.remove(id);

    await this.disciplineService.calcNoteByDisciplineId(idUserLog, disciplineId);
  }

  async findOne(disciplineId: number, id: number) {
    const activity = await this.activityGateway.findById(id);

    if (!activity || activity.disciplineId !== disciplineId)
      throw new NotFoundException(`activity de id ${id} não encontrado`);

    return activity;
  }
}
