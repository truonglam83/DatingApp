import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { PhotoDto } from '../photo/dto/photo.dto';
import { PhotoEntity } from '../photo/entities/photo.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdateBlackList } from './dto/update-blacklist.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        UserEntity,
        UserDto,
        //TODO: do same for other properties that is not common type
        forMember(
          (destination) => destination.photos,
          mapFrom((source) =>
            (source.photos || []).map((item) =>
              //TODO: create auto mapper for conversation for below line work
              this.mapper.map(item, PhotoEntity, PhotoDto)
            )
          )
        ),
        forMember(
          (destination) => destination.hobbies,
          mapFrom(
            (source) =>
              source.hobbies ||
              [].map((item) =>
                this.mapper.map(item, UserEntity, UserProfileDto)
              )
          )
        ),
        forMember(
          (destination) => destination.blackList,
          mapFrom(
            (source) =>
              source.black_list ||
              [].map((item) =>
                this.mapper.map(item, UserEntity, UserDto)
              )
          )
        )
      );
      createMap(mapper, UserEntity, CreateUserDto);
      createMap(
        mapper,
        UserEntity,
        UpdateUserDto,
        forMember(
          (destination) => destination.hobbies,
          mapFrom(
            (source) =>
              source.hobbies ||
              [].map((item) =>
                this.mapper.map(item, UserEntity, UserProfileDto)
              )
          )
        )
      );
      createMap(mapper, UserEntity, LoginDto);

      createMap(
        mapper,
        UserEntity,
        UserProfileDto,

        forMember(
          (destination) => destination.hobbies,
          mapFrom((source) => source.hobbies)
        )
      );


    };
  }
}
