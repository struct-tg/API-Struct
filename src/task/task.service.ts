import { BadRequestException, Inject, Injectable, NotFoundException, ForbiddenException,forwardRef } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskGatewayInterface } from './gateways/task-bd/task-gateway-interface';
import { UserService } from 'src/user/user.service';
import * as moment from 'moment';
import { Task } from './entities/task.entity';
import { Pagination } from 'src/utils/pagination';
import { SubTaskService } from 'src/subtask/subtask.service';

@Injectable()
export class TaskService {
  constructor(
    @Inject("TaskGatewayBD")
    private taskGateway: TaskGatewayInterface,
    private subTaskService: SubTaskService
  ){}
  
  async create(idUserLog: number, createTaskDto: CreateTaskDto) {
    this.validateDate(createTaskDto.dateWishEnd);

    createTaskDto.dateWishEnd = new Date(createTaskDto.dateWishEnd)
    createTaskDto.userId = idUserLog

    const taskCreated = await this.taskGateway.create(createTaskDto);

    await this.subTaskService.create(createTaskDto.subTasks, taskCreated.id);
    return taskCreated
  }

  async findAll(idUser: number, page?: number, limit?: number, status?: string, partialName?: string, ascend = false) {
    
    if(typeof(page) === 'number' && typeof(limit) === 'number' ){

      if(page < 1)
        throw new BadRequestException(`O page deve ser um número positivo`)

      if(limit < 1)
        throw new BadRequestException(`O limit deve ser um número positivo`)

      const count = await this.taskGateway.count(idUser, status, partialName);
      const data = await this.taskGateway.findAllWithPagination(idUser, (page - 1), limit, status, partialName, ascend);
      
      return new Pagination<Task>(data, page, limit, count);
    }
    else{
      const data = await this.taskGateway.findAll(idUser, status, partialName, ascend);

      return new Pagination<Task>(data, 1, data.length, data.length);
    }
  }

  async findOne(idUserLog: number, id: number) {
    
    const task = await this.taskGateway.findById(id)    

    if(!task || task.userId !== idUserLog)
      throw new NotFoundException(`task de id ${id} não encontrado`)

    return task
  }

  async update(idUserLog: number, id: number, updateTaskDto: UpdateTaskDto) {
  
    const task = await this.findOne(idUserLog, id);
    
    if(task.dateEnd)
      throw new ForbiddenException(`Essa tarefa já foi finalizada`);

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

  private validateDate(dateWishEndInput: Date){
    
    const now = moment(new Date()).startOf('day');
    const dateWishEnd = moment(dateWishEndInput).startOf('day');
    
    if(now.isAfter(dateWishEnd))
      throw new BadRequestException(`Data de previsão de término não pode ser inferior a data atual`);

  }
}
