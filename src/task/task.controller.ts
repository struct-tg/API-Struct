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
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtGuard } from 'src/guards/auth/jwt.guard';

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
  findAll(@Req() req: any) {
    return this.taskService.findAll(req.user.id);
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
    idTask: number
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
