import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationEntity } from './entities/location.entity';
import { UserProfileDto } from 'src/user/dto/user-profile.dto';
import { MatchService } from 'src/match/match.service';
import { ILocationService } from './interfaces/location.interface';
import { MatchDto } from 'src/match/dto/match.dto';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class LocationService implements ILocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly _locationRepository: Repository<LocationEntity>,
    private readonly _userService: UserService,
    private readonly _matchService: MatchService,
    @InjectMapper()
    private readonly _mapper: Mapper
  ) { }

  async findUsersInRadius(
    latitude: number,
    longitude: number,
    radius: number,
    userId: string
  ): Promise<UserProfileDto[]> {
    try {
      const users = await this._locationRepository.query(
        `Select u.* as user, location.* , st_distancesphere(st_makepoint(${latitude}, ${longitude}),st_makepoint(location.latitude, location.longitude)) as distance
        from location left join "user" as u
        on location.user_id = u.id
        where location.user_id = u.id
        and st_dwithin(st_makepoint(${latitude}, ${longitude}), st_makepoint(location.latitude, location.longitude), ${radius / 100000
        })
        order by distance`
      );
      const userMappedDto: UserProfileDto[] = users.map((user) => {
        const userDto: UserProfileDto = this._mapper.map(user, UserEntity, UserProfileDto);
        userDto.id = user.user_id;
        userDto.latitude = Number(user.latitude);
        userDto.longitude = Number(user.longitude);
        userDto.distance = user.distance;
        return userDto;
      });
      //get blacklist user
      const blacklistUser: string[] = await this._userService.getBlackList(userId);

      //filter blacklist user
      let listUser: UserProfileDto[];
      if (blacklistUser) {
        listUser = userMappedDto.filter(
          (user: UserProfileDto) => !blacklistUser.includes(user.id) && user.id != userId
        );
      } else {
        listUser = userMappedDto.filter((user: UserProfileDto) => user.id != userId);
      }

      // get user matched
      const userMatched: MatchDto[] = await this._matchService.getUserHasLiked(userId);
      // filter user matched
      const newListUser = listUser.filter(
        (item: UserProfileDto) =>
          !userMatched?.some(
            (x) => x.userId === item.id || x.matchedUser === item.id
          )
      );

      return newListUser;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  //  Check userId exist in location table. if exist, update location. if not, create new location
  async createLocation(userId: string, createLocation: CreateLocationDto): Promise<any> {
    try {
      const userIdExist = await this._locationRepository.findOne({
        where: { userId: userId },
      });
      if (userIdExist) {
        await this._locationRepository.update(
          { userId: userId },
          createLocation
        );
        return true;
      } else {
        await this._locationRepository.save({
          userId: userId,
          latitude: createLocation.latitude,
          longitude: createLocation.longitude,
        });
        return false;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
