import { Injectable } from '@nestjs/common';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubtaskService {
  create(listCreateSubtaskDto: CreateSubtaskDto[], idTask: number) {

    console.log(`\n\n\nLista de sub tasks da task: ${idTask}`);
    console.log(listCreateSubtaskDto);
    
    return 'This action adds a new subtask';
  }

  remove(id: number) {
    return `This action removes a #${id} subtask`;
  }
}
