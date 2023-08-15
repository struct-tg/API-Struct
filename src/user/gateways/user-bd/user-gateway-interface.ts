import { CreateUserDto } from "src/user/dto/create-user.dto";
import { User } from "src/user/entities/user.entity";

export interface UserGatewayInterface{
    create(newUser: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    delete(id: number): Promise<void>;
}