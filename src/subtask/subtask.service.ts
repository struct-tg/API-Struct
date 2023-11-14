import { Injectable, Inject } from '@nestjs/common';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { Subtask } from './entities/subtask.entity';
import { SubTaskGatewayInterface } from './gateways/subtask-bd/sub-task-gateways-interface';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubTaskService {

  constructor(
    @Inject("SubTaskGatewayBd")
    private subTaskGateway: SubTaskGatewayInterface
  ){}

  async create(listCreateSubtaskDto: CreateSubtaskDto[], taskId: number) {

    if(listCreateSubtaskDto && listCreateSubtaskDto.length > 0){
      let listCreateSubtask = listCreateSubtaskDto.map(item => {
        return new Subtask({...item, taskId})
      })

      await this.subTaskGateway.create(listCreateSubtask);
    }
  }

  async update(listUpdateSubtaskDto: UpdateSubtaskDto[], taskId: number) {

    await this.subTaskGateway.delete(taskId);

    if(listUpdateSubtaskDto && listUpdateSubtaskDto.length > 0){
      let listUpdateSubtask = listUpdateSubtaskDto.map(item => {
        return new Subtask({...item, taskId})
      })

      await this.subTaskGateway.create(listUpdateSubtask);
    }
  }

  async onOffByIdTask(taskId: number) {
    await this.subTaskGateway.onOffByIdTask(taskId);
  }
}
