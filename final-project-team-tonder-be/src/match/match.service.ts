import { UserService } from 'src/user/user.service';
import { MatchDto } from './dto/match.dto';
import { MatchEntity } from 'src/match/entities/match.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 as uuidv4 } from 'uuid';
import { SocketNotification } from 'src/notification/dto/socket-notification';
import { IMatchService } from './interfaces/match.interface';
@Injectable()
export class MatchService implements IMatchService {
  constructor(
    @InjectRepository(MatchEntity)
    private readonly _matchRepo: Repository<MatchEntity>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private eventEmitter: EventEmitter2
  ) {}

  async createMatch(
    userId: string,
    matchedUserId: string
  ): Promise<SocketNotification[]> {
    if (!userId) throw new BadRequestException('User is invalid');

    try {
      let match: MatchEntity = await this._matchRepo
        .createQueryBuilder('match')
        .where(
          new Brackets((qb) => {
            qb.where('match.matchedUser = :userId', { userId: userId }).orWhere(
              'match.userId = :userId',
              { userId: userId }
            );
          })
        )
        .andWhere(
          new Brackets((qb) => {
            qb.where('match.matchedUser = :matchedUser', {
              matchedUser: matchedUserId,
            }).orWhere('match.userId = :matchedUser', {
              matchedUser: matchedUserId,
            });
          })
        )
        .getOne();

      const isMatch = match ? true : false;

      match = {
        id: match?.id || uuidv4(),
        userId: match?.userId || userId,
        matchedUser: match?.matchedUser || matchedUserId,
        isMatch: isMatch,
      };

      const matchEntity = await this._matchRepo.save(match);
      if (!matchEntity) {
        //TODO: throw exception
        throw new BadRequestException('Something went wrong');
      }

      const users = await this._userService.findUsersById(
        match.userId,
        match.matchedUser
      );

      const data: SocketNotification[] = users.map(
        (user: SocketNotification) => {
          return {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
          };
        }
      );

      const matchResult: string[] = [];
      if (matchEntity.isMatch) {
        this.eventEmitter.emit('notification', match, data, match.userId);
        matchResult.push(matchEntity.userId, matchEntity.matchedUser);
        const users: SocketNotification[] = await this._userService.findByIds(
          matchResult
        );
        return users;
      }
    } catch (error) {
      return error;
    }
  }

  async getMatchedUserByUserId(userId: string): Promise<SocketNotification[]> {
    if (!userId) throw new BadRequestException('User is invalid');

    try {
      const userBlacklist: string[] = await this._userService.getBlackList(
        userId
      );

      const matchBuilder = this._matchRepo
        .createQueryBuilder('match')
        .where(
          new Brackets((qb) => {
            qb.where('match.matchedUser = :userId', {
              userId: userId,
            }).orWhere('match.userId=:userId', { userId: userId });
          })
        )
        .andWhere('match.isMatch = true');

      if (userBlacklist.length) {
        matchBuilder.andWhere(
          new Brackets((qb) => {
            qb.andWhere('match.matchedUser NOT IN (:...userBlacklist)', {
              userBlacklist: userBlacklist,
            }).andWhere('match.userId NOT IN (:...userBlacklist)', {
              userBlacklist: userBlacklist,
            });
          })
        );
      }

      const match = await matchBuilder.getMany();
      const matchResult: string[] = [];

      match.map((item) => {
        if (item.userId === userId) {
          matchResult.push(item.matchedUser);
        } else {
          matchResult.push(item.userId);
        }
      });
      if (matchResult.length > 0) {
        let users: SocketNotification[] = await this._userService.findByIds(
          matchResult
        );
        return users;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async getUserHasLiked(userId: string): Promise<MatchDto[]> {
    if (!userId) throw new BadRequestException('User is invalid');

    try {
      const match = await this._matchRepo
        .createQueryBuilder('match')
        .where(
          new Brackets((qb) => {
            qb.where('match.matchedUser = :userId', {
              userId: userId,
            }).andWhere('match.isMatch = true');
          })
        )
        .orWhere('match.userId=:userId')
        .getMany();

      const data = this._mapper.mapArray(match, MatchEntity, MatchDto);
      return data;
    } catch (error) {
      return error;
    }
  }
}
