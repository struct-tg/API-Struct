import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

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
    private disciplineService: DisciplineService
  ) { }

  async create(createActivityDto: CreateActivityDto) {
    createActivityDto.date = new Date(createActivityDto.date)
    return await this.activityGateway.create(createActivityDto);    
  }

  async findAll(idUserLog: number, disciplineId: number, tipeAc: string, page?: number, limit?: number, partialName?: string) {
    if (typeof (page) === 'number' && typeof (limit) === 'number') {

      await this.disciplineService.findOne(idUserLog, disciplineId); 

      if (page < 1)
        throw new BadRequestException(`O page deve ser um número positivo`);

      if (limit < 1)
        throw new BadRequestException(`O limit deve ser um número positivo`);

      const count = await this.activityGateway.count(disciplineId, partialName, tipeAc);
      const date = await this.activityGateway.findAllWithPagination(disciplineId, (page - 1), limit, partialName, tipeAc);

      return new Pagination<Activity>(date, page, limit, count);
    }
    else {
      const date = await this.activityGateway.findAll(disciplineId, partialName, tipeAc);

      return new Pagination<Activity>(date, 1, date.length, date.length);
    }
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    updateActivityDto.date = new Date(updateActivityDto.date)
    await this.findOne(updateActivityDto.disciplineId, id);

    const activityUpdated = await this.activityGateway.update(id, updateActivityDto);

    return activityUpdated;
  }

  async remove(disciplineId: number, id: number) {
    await this.findOne(disciplineId, id);

    await this.activityGateway.remove(id);
  }

  async findOne(disciplineId: number, id: number) {
    const activity = await this.activityGateway.findById(id);

    if (!activity || activity.disciplineId !== disciplineId)
      throw new NotFoundException(`activity de id ${id} não encontrado`);

    return activity;
  }
}
