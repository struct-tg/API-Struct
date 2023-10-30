import { BadRequestException, Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskGatewayInterface } from './gateways/task-bd/task-gateway-interface';
import * as moment from 'moment';
import { Task } from './entities/task.entity';
import { Pagination } from 'src/utils/pagination';
import { SubTaskService } from 'src/subtask/subtask.service';
import { DisciplineService } from 'src/discipline/discipline.service';
import { TaskStatus } from './enums/task-filter-status';
import { ResumeResponseDto } from './dto/resume-response.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject("TaskGatewayBD")
    private taskGateway: TaskGatewayInterface,
    private subTaskService: SubTaskService,
    private disciplineService: DisciplineService
  ){}
  
  async create(idUserLog: number, createTaskDto: CreateTaskDto) {
    this.validateDate(createTaskDto.dateWishEnd);

    createTaskDto.dateWishEnd = new Date(createTaskDto.dateWishEnd)
    createTaskDto.userId = idUserLog

    if(createTaskDto.disciplineId){
      await this.disciplineService.findOne(idUserLog, createTaskDto.disciplineId)
    }

    const taskCreated = await this.taskGateway.create(createTaskDto);

    await this.subTaskService.create(createTaskDto.subTasks, taskCreated.id);
    return taskCreated
  }

  async findAll(idUser: number, page?: number, limit?: number, status?: string, partialName?: string, ascend = false, disciplineId?: number) {
    
    if(typeof(page) === 'number' && typeof(limit) === 'number' ){

      if(page < 1)
        throw new BadRequestException(`Page deve ser positivo`)

      if(limit < 1)
        throw new BadRequestException(`Limit deve ser positivo`)

      const count = await this.taskGateway.count(idUser, status, partialName, disciplineId);
      const data = await this.taskGateway.findAllWithPagination(idUser, (page - 1), limit, status, partialName, ascend, disciplineId);
      
      return new Pagination<Task>(data, page, limit, count);
    }
    else{
      const data = await this.taskGateway.findAll(idUser, status, partialName, ascend, disciplineId);

      return new Pagination<Task>(data, 1, data.length, data.length);
    }
  }

  async findOne(idUserLog: number, id: number) {
    
    const task = await this.taskGateway.findById(id)    

    if(!task || task.userId !== idUserLog)
      throw new NotFoundException(`Task não encontrada`)

    return task
  }

  async update(idUserLog: number, id: number, updateTaskDto: UpdateTaskDto) {
  
    const task = await this.findOne(idUserLog, id);
    
    if(task.dateEnd)
      throw new ForbiddenException(`Tarefa finalizada`);

    this.validateDate(updateTaskDto.dateWishEnd);

    updateTaskDto.dateWishEnd = new Date(updateTaskDto.dateWishEnd)
    updateTaskDto.userId = idUserLog

    
    const taskUpdated = await this.taskGateway.update(id, updateTaskDto);
    await this.subTaskService.update(updateTaskDto.subTasks, taskUpdated.id);

    return taskUpdated;
  }

  async onoff(idUserLog: number, id: number){
    const task = await this.findOne(idUserLog, id);
    if(task.dateEnd)
      await this.taskGateway.onOff(id, null);
    else{
      await this.taskGateway.onOff(id, new Date()); 
      await this.subTaskService.onOffByIdTask(id);
    }
  }

  async remove(idUserLog: number, id: number) {
    await this.findOne(idUserLog, id);

    await this.taskGateway.remove(id);
  }

  async getResume(idUserLog: number){

    const listResume: ResumeResponseDto[] = [] as ResumeResponseDto[];

    const arrayLabels = Object.values(TaskStatus);
    const totalTasks = await this.taskGateway.count(idUserLog, null, null, null);
    
    for(const label of arrayLabels){
      const totalByLabel = await this.taskGateway.count(idUserLog, label, null, null);
      const percent = totalByLabel / totalTasks;  
      const resume = new ResumeResponseDto(label, percent);
      listResume.push(resume);
    }

    return listResume;
  }

  private validateDate(dateWishEndInput: Date){
    
    const now = moment(new Date()).startOf('day');
    const dateWishEnd = moment(dateWishEndInput).startOf('day');
    
    if(now.isAfter(dateWishEnd))
      throw new BadRequestException(`Data inválida`);

  }
}
