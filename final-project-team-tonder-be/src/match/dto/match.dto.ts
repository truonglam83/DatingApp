import { UserDto } from 'src/user/dto/user.dto';
import { AutoMap } from '@automapper/classes';

export class MatchDto {
  @AutoMap()
  isMatch: boolean;
  @AutoMap()
  userId: string;
  @AutoMap()
  matchedUser: string;
  @AutoMap()
  toUser: UserDto;
  @AutoMap()
  fromUser: UserDto;
}
