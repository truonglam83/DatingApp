import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/common/firebase/firebase-auth.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Authenticated } from '../common/decorators/gettoken.decorator';
import { CreateAuthDto } from './../auth/dto/create-auth.dto';
import { User } from './../common/decorators/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestLoginDto } from './dto/login-request.dto';
import { UpdateBlackList } from './dto/update-blacklist.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserDto } from './dto/user.dto';
import { ILoginResult } from './types/user.types';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly _userService: UserService) { }

  @Post('login')
  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'FireBase auth token' })
  async login(
    @User() phoneUser: any,
    @Body() user: RequestLoginDto
  ): Promise<ILoginResult> {
    return await this._userService.login(phoneUser.phone_number, user);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new user' })
  async createUser(
    @User() user: CreateAuthDto,
    @Body() request: CreateUserDto
  ): Promise<{ user: UserDto }> {
    return await this._userService.createUser(user, request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch all user' })
  async getAll(): Promise<UserDto[]> {
    return await this._userService.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch user with token' })
  async getProfile(@Authenticated() user): Promise<UserProfileDto> {
    return await this._userService.getProfile(user.id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user' })
  async update(@Authenticated() user, @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
    const data = await this._userService.update(user.id, updateUserDto);
    return data;
  }

  @Put('summary')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @ApiOperation({ summary: 'Update user' })
  async updateSummary(
    @Authenticated() user,
    @UploadedFiles() file: Express.Multer.File[],
    @Body() payload: { name: string; birthday: string }
  ): Promise<any> {
    const data = await this._userService.updateSummary(
      user.id,
      payload.name,
      payload.birthday,
      file
    );
    return data;
  }

  @Get('blacklist')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user blacklist' })
  async getBlackList(@Authenticated() user): Promise<string[]> {
    return await this._userService.getBlackList(user.id);
  }

  @Patch('blackList')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add user to blacklist' })
  async updateBlackList(
    @Authenticated() user,
    @Body() updateBlackList: UpdateBlackList
  ): Promise<UserDto> {
    return await this._userService.updateBlackList(user.id, updateBlackList.id);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  async getUserById(@Param() { id }): Promise<UserDto> {
    return await this._userService.findOne(id);
  }
}


