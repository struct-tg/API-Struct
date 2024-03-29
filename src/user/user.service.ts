import { BadRequestException, NotFoundException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGatewayInterface } from './gateways/user-bd/user-gateway-interface';
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
      throw new BadRequestException(`E-mail já cadastrado`)

    createUserDto.password = this.generatePasswordCrypt(createUserDto.password);

    const user = await this.userGateway.create(createUserDto)

    const newUser = new User(user);

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
    const user = await this.getOneUser(id);

    const userFinded = new User(user);

    return userFinded;
  }

  async findByEmail(email: string) {
    const user = await this.userGateway.findByEmail(email);

    if(!user)
      throw new NotFoundException(`Usuário não encontrado`)

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    await this.getOneUser(id);

    if(updateUserDto?.email)
      delete updateUserDto.email;

    updateUserDto.password = this.generatePasswordCrypt(updateUserDto.password);

    const user = await this.userGateway.update(id, updateUserDto)

    const userUpdated = new User(user);

    return userUpdated;
  }

  async remove(id: number) {
    await this.getOneUser(id);
    await this.userGateway.delete(id);
  }

  async changePassword(newPassword: string, id: number){
    newPassword = this.generatePasswordCrypt(newPassword);
    await this.userGateway.changePassword(id, newPassword);
  }

  private async getOneUser(id: number){
    const user = await this.userGateway.findById(id);

    if(!user)
      throw new NotFoundException(`Usuário não encontrado`)

    return user;
  }

  private generatePasswordCrypt(password: string){
    return bcrypt.hashSync(password, 8);
  }
}
