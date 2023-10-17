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
  ParseEnumPipe
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { JwtGuard } from 'src/guards/auth/jwt.guard';
import { TypeActivity } from './enums/activity-type';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }
  
  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req: any, @Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(req.disciplineId.id, createActivityDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(
    @Req() req: any,

    @Query(
      'tipeAc',
      new ParseEnumPipe(TypeActivity, {
        exceptionFactory: () =>
          new NotAcceptableException(`tipeActivity do filtro inválido`),
        optional: true
      }
      )
    )
    tipeAc: string,

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
    
    @Query('partialName')
    partialName?: string,
  ) {
    return this.activityService.findAll(req.disciplineId.id, tipeAc, page, limit, partialName);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Req() req: any, @Param(
    'id',
    new ParseIntPipe({
      exceptionFactory: () => new NotAcceptableException("O id tem que ser numérico")
    }))
  id: number
  ) {
    return this.activityService.findOne(req.disciplineId.id, id);
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
    @Body() updateActivityDto: UpdateActivityDto
    ) {
      return this.activityService.update(req.disciplineId.id, id, updateActivityDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Req() req: any, @Param(
    'id',
    new ParseIntPipe({
      exceptionFactory: () => new NotAcceptableException("O id tem que ser numérico")
    })) id: number) {
    return this.activityService.remove(req.disciplineId.id, id);
  }
}
