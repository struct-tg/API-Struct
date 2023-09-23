import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserGatewayPrisma } from './gateways/user-bd/user-gateway-prisma';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/configs';
// import { JwtStrategyService } from './jwt-strategy.service';
import { AuthModule } from 'src/guards/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register(jwtConfig),
    AuthModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserGatewayPrisma,
    {
      provide: 'UserGatewayBD',
      useExisting:  UserGatewayPrisma
    }
  ],
  exports: [UserService]
})
export class UserModule {}
