import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './configs';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
