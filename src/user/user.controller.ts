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
  HttpStatus,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogAuth } from './dto/log-auth.dto';
import { JwtGuard } from 'src/guards/auth/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/auth')
  auth(@Body() logAuth: LogAuth){
    return this.userService.logAuth(logAuth);
  }

  @UseGuards(JwtGuard)
  @Get('')
  @UseInterceptors(ClassSerializerInterceptor)
  myAccount(@Req() req: any) {
    return this.userService.findOne(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Put('')
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete('')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Req() req: any) {
    return this.userService.remove(req.user.id);
  }
}
