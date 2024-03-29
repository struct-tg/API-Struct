import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserGatewayInterface } from "./user-gateway-interface";
import { User } from "src/user/entities/user.entity";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class UserGatewayPrisma implements UserGatewayInterface{

    constructor(
      private prisma: PrismaService
    ){}

    async create(newUser: CreateUserDto): Promise<User>{
      const userCreated = await this.prisma.user.create({
          data: newUser
        });

      return userCreated
    }

    async findByEmail(email: string): Promise<User>{
      const userExists = await this.prisma.user.findUnique({
          where: {
            email
          }
        })

      return userExists;
    }

    async findById(id: number): Promise<User> {
      const user = await this.prisma.user.findUnique({
        where: {
          id
        }
      })

      return user;
    }

    async delete(id: number): Promise<void>{
      await this.prisma.user.delete({
        where: {
          id
        }
      })
    }

    async update(id:number, updateUser: UpdateUserDto): Promise<User>{
      const userUpdated = await this.prisma.user.update({
        data: updateUser,
        where: {
          id
        }
      })
      
      return userUpdated;
    }

    async changePassword(id: number, newPassword: string): Promise<void> {
      await this.prisma.user.update({
        where: {
          id
        },
        data: {
          password: newPassword
        }
      })
    }
}