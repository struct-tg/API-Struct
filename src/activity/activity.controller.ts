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
  create(
    @Req() req: any,
    @Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(req.user.id, createActivityDto);
  }

  @UseGuards(JwtGuard)
  @Get('findAll/:disciplineId')
  findAll(
    @Req() req: any,
    @Param(
      'disciplineId',
      new ParseIntPipe({
        exceptionFactory: () => new NotAcceptableException("O disciplineId tem que ser numérico")
      })) 
      disciplineId: number,

    @Query(
      'typeAc',
      new ParseEnumPipe(TypeActivity, {
        exceptionFactory: () =>
          new NotAcceptableException(`typeActivity do filtro inválido`),
        optional: true
      }
      )
    )
    typeAc: string,

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
    return this.activityService.findAll(req.user.id, disciplineId, typeAc, page, limit, partialName);
  }

  @UseGuards(JwtGuard)
  @Get(':disciplineId/:id')
  findOne(
    @Param(
      'disciplineId',
      new ParseIntPipe({
        exceptionFactory: () => new NotAcceptableException("O disciplineId tem que ser numérico")
      })) 
      disciplineId: number,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => new NotAcceptableException("O id tem que ser numérico")
      }))
    id: number
  ) {
    return this.activityService.findOne(disciplineId, id);
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
      return this.activityService.update(req.user.id, id, updateActivityDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':disciplineId/:id')
  remove(
    @Req() req: any,
    @Param(
    'disciplineId',
    new ParseIntPipe({
      exceptionFactory: () => new NotAcceptableException("O disciplineId tem que ser numérico")
    })) 
    disciplineId: number,
    @Param(
    'id',
    new ParseIntPipe({
      exceptionFactory: () => new NotAcceptableException("O id tem que ser numérico")
    })) 
    id: number) {
    return this.activityService.remove(req.user.id, disciplineId, id);
  }
}
