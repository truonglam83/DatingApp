import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocketNotification } from 'src/notification/dto/socket-notification';
import { Repository } from 'typeorm';
import { FirebaseService } from '../common/firebase/firebase.service';
import { AuthService } from './../auth/auth.service';
import { CreateAuthDto } from './../auth/dto/create-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestLoginDto } from './dto/login-request.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { IUserService } from './interfaces/user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly _firebaseService: FirebaseService,
    @InjectRepository(UserEntity) private _userRepo: Repository<UserEntity>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _authService: AuthService
  ) {}

  // ================ handle login  with phone =============== //
  async login(
    phone: string,
    user: RequestLoginDto
  ): Promise<{ accessToken: string; user: LoginDto }> {
    const { email, name } = user;
    if (!phone) {
      throw new BadRequestException('Invalid phone number');
    }

    const userExist = await this._userRepo.findOne({ where: { phone: phone } });

    const userData: LoginDto = {
      id: userExist?.id,
      phone: phone,
      email: email,
      name: name,
      isPhoneConfirmed: userExist?.isPhoneConfirmed,
    };

    if (!userExist) {
      const user = await this._userRepo.save({
        phone: phone,
        email: email,
        name: name,
        isPhoneConfirmed: false,
      });

      userData.id = user.id;
      userData.isPhoneConfirmed = user.isPhoneConfirmed;
    }
    const data = this._mapper.map(userData, UserEntity, LoginDto);

    return {
      user: data,
      accessToken: await this._authService.signJwtToken(userData),
    };
  }

  // ================== handle create new user ================ //
  async createUser(
    user: CreateAuthDto,
    request: CreateUserDto
  ): Promise<{ user: UserDto }> {
    // if one of the input empty return
    if (!request || !user.phone) {
      throw new BadRequestException('Phone must be provided');
    }

    try {
      const userExist = await this._userRepo.findOne({
        where: { phone: user.phone },
      });

      const createUser = await this._userRepo.save({
        ...userExist,
        name: request.name,
        email: request.email,
        age: request.age,
        gender: request.gender,
        isPhoneConfirmed: true,
      });

      const data = this._mapper.map(createUser, UserEntity, UserDto);
      return {
        user: data,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findUsersById(userId: string, matchedUser: string): Promise<UserDto[]> {
    if (!userId || !matchedUser)
      throw new BadRequestException('User not found');

    const users = await this._userRepo.findByIds([userId, matchedUser]);

    const data = this._mapper.mapArray(users, UserEntity, UserDto);

    return data;
  }

  async findByIds(userId: string[]): Promise<SocketNotification[]> {
    if (!userId) throw new BadRequestException('User not found');
    try {
      const users = await this._userRepo
        .createQueryBuilder('user')
        .where('user.id IN (:...id)', { id: userId })
        .getMany();
      const data = [];
      users.map((user) => {
        data.push({
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        });
      });
      return data;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async findAll(): Promise<UserDto[]> {
    try {
      const entities = await this._userRepo.find();
      const data = this._mapper.mapArray(entities, UserEntity, UserDto);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async findOne(userId: string): Promise<UserDto> {
    try {
      const entity = await this._userRepo.findOne({ where: { id: userId } });
      const data = this._mapper.map(entity, UserEntity, UserDto);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getProfile(userId: string): Promise<UserProfileDto> {
    try {
      const entity = await this._userRepo.findOne({ where: { id: userId } });
      const data = this._mapper.map(entity, UserEntity, UserProfileDto);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UpdateUserDto> {
    const user = await this._userRepo.findOne({ where: { id } });
    const updatedUser = this._mapper.map(
      updateUserDto,
      UserEntity,
      UpdateUserDto
    );
    const data = await this._userRepo.save(Object.assign(user, updatedUser));
    return data;
  }

  async updateSummary(
    userId: string,
    userName: string,
    birthday: string,
    file: Express.Multer.File[]
  ): Promise<any> {
    const user = await this._userRepo.findOne({ where: { id: userId } });
    if (file.length === 0) {
      const data = this._userRepo.save(
        Object.assign(user, { name: userName, age: birthday })
      );
      return data;
    } else {
      const path = `images/${Date.now()}_${file[0].filename}`;
      const url = await this._firebaseService.uploadFile(file[0].buffer, path);
      const data = this._userRepo.save(
        Object.assign(user, { avatar: url, name: userName, age: birthday })
      );
      return data;
    }
  }

  async updateBlackList(id: string, userBlockId: string): Promise<UserDto> {
    if (!userBlockId) throw new BadRequestException('User not found');
    const user = await this._userRepo.findOne({ where: { id } });
    const data = this._mapper.map(user, UserEntity, UserDto);
    if (!data.blackList) data.blackList = [];
    const newBlackList = [...data.blackList, userBlockId];
    const response = await this._userRepo.save({
      ...user,
      black_list: newBlackList,
    });
    const mapper = this._mapper.map(response, UserEntity, UserDto);
    return mapper;
  }

  async getBlackList(id: string): Promise<string[]> {
    const user = await this._userRepo.findOne({ where: { id: id } });
    if (user) {
      const data = this._mapper.map(user, UserEntity, UserDto);
      if (data.blackList === undefined) {
        return [];
      } else {
        return data.blackList;
      }
    }
  }
}
