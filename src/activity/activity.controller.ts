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
    @Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
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
    return this.activityService.findAll(req.user.id, disciplineId, tipeAc, page, limit, partialName);
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
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => new NotAcceptableException("O id tem que ser numérico")
      })) id: number, 
    @Body() updateActivityDto: UpdateActivityDto
    ) {
      return this.activityService.update(id, updateActivityDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':disciplineId/:id')
  remove(
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
    return this.activityService.remove(disciplineId, id);
  }
}
