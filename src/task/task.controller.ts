import { Controller, Get, Post, Body, Put, Param, Delete, Req, UseGuards, ParseIntPipe, NotAcceptableException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { getUserIdByToken } from 'src/utils/getUserByToken';
import { JwtGuard } from 'src/guards/auth/jwt.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(
    @Req() req: any
  ) {
    const idUser = getUserIdByToken(req);
    return this.taskService.findAll(idUser);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({exceptionFactory: () => 
    new NotAcceptableException(`O id tem que ser numérico`)
  })) id: number) {
    return this.taskService.findOne(id); 
  }

  @Put(':id')
  update(@Param('id', new ParseIntPipe({exceptionFactory: () => new NotAcceptableException(`O id tem que ser numérico`)})) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
