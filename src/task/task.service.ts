import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskGatewayInterface } from './gateways/task-bd/task-gateway-interface';

@Injectable()
export class TaskService {
  constructor(
    @Inject("TaskGatewayBD")
    private taskGateway: TaskGatewayInterface
  ){}
  
  async create(createTaskDto: CreateTaskDto) {

    createTaskDto.dateStart = new Date(createTaskDto.dateStart);
    createTaskDto.dateWishEnd = new Date(createTaskDto.dateWishEnd)

    const taskCreated = this.taskGateway.create(createTaskDto);

    return taskCreated;
  }

  async findAll(idUser: number) {
    return await this.taskGateway.findAll(idUser);
  }

  async findOne(id: number) {
    
    const task = await this.taskGateway.findById(id)    

    if(!task)
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
