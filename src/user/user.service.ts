import { BadRequestException, NotFoundException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGatewayInterface } from './gateways/user-bd/user-gateway-interface';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { LogAuth } from './dto/log-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @Inject('UserGatewayBD')
    private userGateway: UserGatewayInterface,
    private jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto) {

    const userExists = await this.userGateway.findByEmail(createUserDto.email); 
    
    if(userExists)
      throw new BadRequestException(`Um usuário com o e-mail informado já foi cadastrado`)

    createUserDto.password = await bcrypt.hashSync(createUserDto.password, 8);

    const newUser = await this.userGateway.create(createUserDto)

    return newUser
  }

  async logAuth(logAuth: LogAuth){
    const user = await this.userGateway.findByEmail(logAuth.email);

    if(!user)
      throw new BadRequestException(`E-Mail e/ou senha inválidos`);

    const passwordNotCorrect = !bcrypt.compareSync(logAuth.password, user.password)

    if(passwordNotCorrect)
      throw new BadRequestException(`E-Mail e/ou senha inválidos`);

    const payload = {
      id: user.id
    }

    return {token: this.jwtService.sign(payload)}
  }

  async findOne(id: number) {
    const user = await this.userGateway.findById(id);

    this.validateUser(user, id);

    delete user.password;

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private validateUser(user: User, id: number){
    if(!user)
      throw new NotFoundException(`Usuário de id: ${id} não encontrado`)
  }
}
