import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  NotAcceptableException,
  Put,
  UseGuards,
  Query,
  ParseEnumPipe,
  ParseBoolPipe
} from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { JwtGuard } from 'src/guards/auth/jwt.guard';
import { StatusDiscipline } from './enums/discipline-filter-status';

@Controller('discipline')
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) { }
  
  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req: any, @Body() createDisciplineDto: CreateDisciplineDto) {
    return this.disciplineService.create(req.user.id, createDisciplineDto);
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
      new ParseEnumPipe(StatusDiscipline, {
        exceptionFactory: () =>
          new NotAcceptableException(`Status do filtro inválido`),
        optional: true
      })
    )
    status?: StatusDiscipline,
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
      ascend?: boolean
  ) {
    return this.disciplineService.findAll(req.user.id, page, limit, status, partialName, ascend);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(
    @Req() req: any, 
    @Param(
    'id',
    new ParseIntPipe({
      exceptionFactory: () => new NotAcceptableException("O id tem que ser numérico")
    }))
  id: number
  ) {
    return this.disciplineService.findOne(req.user.id, id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Req() req: any,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => new NotAcceptableException("O id tem que ser numérico")
      })) id: number, 
    @Body() updateDisciplineDto: UpdateDisciplineDto
    ) {
      return this.disciplineService.update(req.user.id, id, updateDisciplineDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Req() req: any, @Param(
    'id',
    new ParseIntPipe({
      exceptionFactory: () => new NotAcceptableException("O id tem que ser numérico")
    })) id: number) {
    return this.disciplineService.remove(req.user.id, id);
  }
}
