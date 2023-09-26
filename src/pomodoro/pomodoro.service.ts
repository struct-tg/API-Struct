import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePomodoroDto } from './dto/create-pomodoro.dto';
import { UpdatePomodoroDto } from './dto/update-pomodoro.dto';
import { PomodoroGatewayInterface } from './gateways/pomodoro-bd/pomodoro-gateway-interface';
import { Pagination } from 'src/utils/pagination';
import { Pomodoro } from './entities/pomodoro.entity';

@Injectable()
export class PomodoroService {

  constructor(
    @Inject('PomodoroGateawyBD')
    private pomodoroGateway: PomodoroGatewayInterface
  ){}

  async create(idUserLog: number, createPomodoroDto: CreatePomodoroDto) {

    createPomodoroDto.userId = idUserLog;

    const pomodoro = await this.pomodoroGateway.create(createPomodoroDto);
    return pomodoro;
  }

  async findAll(idUserLog: number) {
    const data = await this.pomodoroGateway.findAll(idUserLog);
    return new Pagination<Pomodoro>(data, 1, data.length, data.length);
  }

  async findOne(idUserLog: number, id: number) {
    const pomodoro = await this.pomodoroGateway.findById(id);
    
    if(!pomodoro || pomodoro.userId !== idUserLog)
      throw new NotFoundException(`Pomodoro não encontrado`);

    return pomodoro;
  }

  async update(idUserLog: number, id: number, updatePomodoroDto: UpdatePomodoroDto) {
    await this.findOne(idUserLog, id);

    const pomodoroUpdated = await this.pomodoroGateway.update(id, updatePomodoroDto);

    return pomodoroUpdated;
  }

  async remove(idUserLog: number, id: number) {
    await this.findOne(idUserLog, id);
    await this.pomodoroGateway.remove(id);
  }
}
