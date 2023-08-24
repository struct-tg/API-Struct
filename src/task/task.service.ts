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

    const now = moment(new Date().toDateString()).startOf('day');
    const dateStart = moment(createTaskDto.dateStart.toString()).startOf('day');
    const dateWishEnd = moment(createTaskDto.dateWishEnd.toString()).startOf('day');

    if(now.isAfter(dateStart))
      throw new BadRequestException(`Data início não pode ser inferior a data atual`);

    if(dateStart.isAfter(dateWishEnd))
      throw new BadRequestException(`Data início não pode ser superior a data de previsão de término da tarefa`);

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

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
