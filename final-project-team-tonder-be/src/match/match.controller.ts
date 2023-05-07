import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { MatchService } from './match.service';
import { MatchDto } from './dto/match.dto';
import { SocketNotification } from 'src/notification/dto/socket-notification';

@Controller('match')
export class MatchController {
  constructor(private readonly _matchService: MatchService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findMatchedUser(
    @User() user: CreateAuthDto,
    @Body() userMatched: { id: string }
  ): Promise<SocketNotification[]> {
    return await this._matchService.createMatch(user.id, userMatched.id);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getMatchedUserByUserId(
    @User() user: CreateAuthDto
  ): Promise<SocketNotification[]> {
    return await this._matchService.getMatchedUserByUserId(user.id);
  }

  @Get('has-liked')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getUserHasLiked(@User() user: CreateAuthDto): Promise<MatchDto[]> {
    return await this._matchService.getUserHasLiked(user.id);
  }
}
