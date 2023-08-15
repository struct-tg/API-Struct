import { JwtModuleOptions } from "@nestjs/jwt"

export const jwtConfig: JwtModuleOptions = {
    secret: process.env.SECRET_KEY,
    signOptions: {
        expiresIn: process.env.EXPIRED,
    }
}