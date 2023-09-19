import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  NotAcceptableException,
  HttpCode,
  HttpStatus,
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

  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Req() req: any,
    @Param(
      'id', 
      new ParseIntPipe({
        exceptionFactory: () =>
          new NotAcceptableException(`O id tem que ser numérico`)
      })
    ) 
    id: number,
    @Body() updatePomodoroDto: UpdatePomodoroDto,
  ) {
    return this.pomodoroService.update(req.user.id, id, updatePomodoroDto);
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
    id: number,
  ) {
    return this.pomodoroService.remove(req.user.id, id);
  }
}
