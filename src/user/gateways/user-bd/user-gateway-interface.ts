import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { User } from "src/user/entities/user.entity";

export interface UserGatewayInterface{
    create(newUser: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    delete(id: number): Promise<void>;
    update(id:number, updateUser: UpdateUserDto): Promise<User>;
    changePassword(id: number, newPassword: string): Promise<void>;
}