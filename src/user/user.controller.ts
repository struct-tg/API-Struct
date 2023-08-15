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
  HttpCode
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogAuth } from './dto/log-auth.dto';
import { JwtGuard } from 'src/guards/auth/jwt.guard';
import { getUserIdByToken } from 'src/utils/getUserByToken';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/auth')
  auth(@Body() logAuth: LogAuth){
    return this.userService.logAuth(logAuth);
  }

  @UseGuards(JwtGuard)
  @Get('')
  myAccount(@Req() req: any) {
    const id = getUserIdByToken(req);
    return this.userService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Put('')
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    const id = getUserIdByToken(req);
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete('')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Req() req: any) {
    const id = getUserIdByToken(req);
    return this.userService.remove(id);
  }
}
