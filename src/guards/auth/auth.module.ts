import { Module } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { JwtStrategyService } from './jwt-strategy.service';

@Module({
    imports: [],
    controllers: [],
    providers: [JwtGuard, JwtStrategyService],
    exports: [JwtGuard, JwtStrategyService]
})
export class AuthModule {}
