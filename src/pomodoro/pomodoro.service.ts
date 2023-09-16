import { Inject, Injectable } from '@nestjs/common';
import { CreatePomodoroDto } from './dto/create-pomodoro.dto';
import { UpdatePomodoroDto } from './dto/update-pomodoro.dto';
import { PomodoroGatewayInterface } from './gateways/pomodoro-bd/pomodoro-gateway-interface';

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
    const listPomodoro = await this.pomodoroGateway.findAll(idUserLog);
    return listPomodoro;
  }

  findOne(id: number) {
    return `This action returns a #${id} pomodoro`;
  }

  update(id: number, updatePomodoroDto: UpdatePomodoroDto) {
    return `This action updates a #${id} pomodoro`;
  }

  remove(id: number) {
    return `This action removes a #${id} pomodoro`;
  }
}
