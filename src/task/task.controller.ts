import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ParseIntPipe,
  NotAcceptableException,
  HttpCode,
  HttpStatus,
  Query,
  ParseEnumPipe,
  ParseBoolPipe
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtGuard } from 'src/guards/auth/jwt.guard';
import { TaskStatus } from './enums/task-filter-status';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req: any, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(req.user.id, createTaskDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(
    @Req() req: any,
    @Query(
      'page',
      new ParseIntPipe({
        exceptionFactory: () =>
          new NotAcceptableException(`O page tem que ser numérico`),
        optional: true
      }),
    )
    page?: number,
    @Query(
      'limit',
      new ParseIntPipe({
        exceptionFactory: () =>
          new NotAcceptableException(`O limit tem que ser numérico`),
        optional: true
      }),
    )
    limit?: number,
    @Query(
      'status',
      new ParseEnumPipe(TaskStatus, {
        exceptionFactory: () =>
          new NotAcceptableException(`Status do filtro inválido`),
        optional: true
      })
    )
    status?: TaskStatus,
    @Query('partialName')
    partialName?: string,
    @Query(
      'orderAscend',
      new ParseBoolPipe({
        exceptionFactory: () =>
          new NotAcceptableException(`A ordenação ascendente (antigo para o recente) deve ser um booleano. Se false será descendente (do recente para o antigo)`),
        optional: true
      })
    )
    ascend?: boolean,
    @Query(
      'disciplineId',
      new ParseIntPipe({
        exceptionFactory: () =>
          new NotAcceptableException(`O disciplineId tem que ser numérico`),
        optional: true
      }),
    )
    disciplineId?: number
  ) {
    return this.taskService.findAll(req.user.id, page, limit, status, partialName, ascend, disciplineId);
  }

  @UseGuards(JwtGuard)
  @Get('resume')
  getResume(
    @Req() req: any,
    @Query('dateStart')
    dateStartString: string,
    @Query('dateEnd')
    dateEndString: string
  ) {
    return this.taskService.getResume(req.user.id, dateStartString, dateEndString);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(
    @Req() req: any,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () =>
          new NotAcceptableException(`O id tem que ser numérico`),
      }),
    )
    id: number,
  ) {
    return this.taskService.findOne(req.user.id, id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Req() req: any,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () =>
          new NotAcceptableException(`O id tem que ser numérico`),
      }),
    )
    idTask: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(req.user.id, idTask, updateTaskDto);
  }

  @UseGuards(JwtGuard)
  @Patch('onoff/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  onOff(
    @Req() req: any,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () =>
          new NotAcceptableException(`O id tem que ser numérico`),
      }),
    )
    idTask: number,
  ) {
    return this.taskService.onoff(req.user.id, idTask);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Req() req: any,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () =>
          new NotAcceptableException(`O id tem que ser numérico`),
      }),
    )
    idTask: number,
  ) {
    return this.taskService.remove(req.user.id, idTask);
  }
}
