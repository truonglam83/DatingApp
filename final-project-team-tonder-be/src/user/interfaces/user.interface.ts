import { RequestLoginDto } from './../dto/login-request.dto';
import { UserDto } from "../dto/user.dto";
import { CreateAuthDto } from "./../../auth/dto/create-auth.dto";
import { CreateUserDto } from "./../dto/create-user.dto";
import { ILoginResult } from "./../types/user.types";
import { SocketNotification } from 'src/notification/dto/socket-notification';
import { UserProfileDto } from '../dto/user-profile.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export interface IUserService {
    login(phone: string, user: RequestLoginDto): Promise<ILoginResult>;
    createUser(user: CreateAuthDto, request: CreateUserDto): Promise<{ user: UserDto }>;
    findUsersById(userId: string, matchedUser: string): Promise<UserDto[]>;
    findByIds(userId: string[]): Promise<SocketNotification[]>;
    findAll(): Promise<UserDto[]>;
    findOne(userId: string): Promise<UserDto>;
    getProfile(userId: string): Promise<UserProfileDto>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateUserDto>;
    updateSummary(userId: string, userName: string, birthday: string, file: Express.Multer.File[]): Promise<any>;
    updateBlackList(id: string, userBlockId: string): Promise<UserDto>;
    getBlackList(id: string): Promise<string[]>;
}
