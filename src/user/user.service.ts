import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGatewayInterface } from './gateways/user-bd/user-gateway-interface';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @Inject('UserGatewayBD')
    private userGateway: UserGatewayInterface,
  ){}

  async create(createUserDto: CreateUserDto) {

    const userExists = await this.userGateway.findByEmail(createUserDto.email); 
    
    if(userExists)
      throw new BadRequestException(`Um usuário com o e-mail informado já foi cadastrado`)

    createUserDto.password = await bcrypt.hashSync(createUserDto.password, 8);

    const newUser = await this.userGateway.create(createUserDto)

    return newUser
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
