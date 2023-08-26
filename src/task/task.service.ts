import { BadRequestException, Inject, Injectable, NotFoundException, ForbiddenException,forwardRef } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskGatewayInterface } from './gateways/task-bd/task-gateway-interface';
import { UserService } from 'src/user/user.service';
import * as moment from 'moment';

@Injectable()
export class TaskService {
  constructor(
    @Inject("TaskGatewayBD")
    private taskGateway: TaskGatewayInterface
  ){}
  
  async create(idUserLog: number, createTaskDto: CreateTaskDto) {

    this.validateDate(createTaskDto.dateStart, createTaskDto.dateWishEnd);

    createTaskDto.dateStart = new Date(createTaskDto.dateStart);
    createTaskDto.dateWishEnd = new Date(createTaskDto.dateWishEnd)
    createTaskDto.userId = idUserLog

    const taskCreated = this.taskGateway.create(createTaskDto);

    return taskCreated;
  }

  async findAll(idUser: number) {
    return await this.taskGateway.findAll(idUser);
  }

  async findOne(idUserLog: number, id: number) {
    
    const task = await this.taskGateway.findById(id)    

    if(!task || task.userId !== idUserLog)
      throw new NotFoundException(`task de id ${id} não encontrado`)

    return task
  }

  async update(idUserLog: number, id: number, updateTaskDto: UpdateTaskDto) {
  
    await this.findOne(idUserLog, id);
    
    this.validateDate(updateTaskDto.dateStart, updateTaskDto.dateWishEnd);

    updateTaskDto.dateStart = new Date(updateTaskDto.dateStart);
    updateTaskDto.dateWishEnd = new Date(updateTaskDto.dateWishEnd)
    updateTaskDto.userId = idUserLog

    const taskUpdated = await this.taskGateway.update(id, updateTaskDto);

    return taskUpdated;
  }

  async onoff(idUserLog: number, id: number){
    const task = await this.findOne(idUserLog, id);
    if(task.dateEnd)
      await this.taskGateway.onOff(id, null);
    else
      await this.taskGateway.onOff(id, new Date()); 
  }

  async remove(idUserLog: number, id: number) {
    await this.findOne(idUserLog, id);

    await this.taskGateway.remove(id);
  }

  private validateDate(dateStartInput: Date, dateWishEndInput: Date){
    
    const now = moment(new Date()).startOf('day');
    const dateStart = moment(dateStartInput).startOf('day');
    const dateWishEnd = moment(dateWishEndInput).startOf('day');
    
    if(now.isAfter(dateStart))
      throw new BadRequestException(`Data início não pode ser inferior a data atual`);

    if(dateStart.isAfter(dateWishEnd))
      throw new BadRequestException(`Data início não pode ser superior a data de previsão de término da tarefa`);
  }
}
