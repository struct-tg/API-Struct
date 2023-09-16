import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  NotAcceptableException,
} from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { CreatePomodoroDto } from './dto/create-pomodoro.dto';
import { UpdatePomodoroDto } from './dto/update-pomodoro.dto';
import { JwtGuard } from 'src/guards/auth/jwt.guard';

@Controller('pomodoro')
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req: any, @Body() createPomodoroDto: CreatePomodoroDto) {
    return this.pomodoroService.create(req.user.id, createPomodoroDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req: any) {
    return this.pomodoroService.findAll(req.user.id);
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
    return this.pomodoroService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePomodoroDto: UpdatePomodoroDto,
  ) {
    return this.pomodoroService.update(+id, updatePomodoroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pomodoroService.remove(+id);
  }
}
