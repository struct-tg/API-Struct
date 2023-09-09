import { Injectable, Inject } from '@nestjs/common';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { Subtask } from './entities/subtask.entity';
import { SubTaskGatewayInterface } from './gateways/subtask-bd/sub-task-gateways-interface';

@Injectable()
export class SubTaskService {

  constructor(
    @Inject("SubTaskGatewayBd")
    private subTaskService: SubTaskGatewayInterface
  ){}

  async create(listCreateSubtaskDto: CreateSubtaskDto[], taskId: number) {

    let listCreateSubtask = listCreateSubtaskDto.map(item => {
      return new Subtask({...item, taskId})
    })

    await this.subTaskService.create(listCreateSubtask);
  }

  remove(id: number) {
    return `This action removes a #${id} subtask`;
  }
}
