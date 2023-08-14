import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserGatewayPrisma } from './gateways/user-bd/user-gateway-prisma';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserGatewayPrisma,
    {
      provide: 'UserGatewayBD',
      useExisting:  UserGatewayPrisma
    }
  ],
})
export class UserModule {}
