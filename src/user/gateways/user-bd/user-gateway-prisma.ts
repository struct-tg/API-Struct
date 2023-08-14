import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserGatewayInterface } from "./user-gateway-interface";
import { User } from "src/user/entities/user.entity";
import { PrismaService } from "src/prisma/prisma.service";

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
}