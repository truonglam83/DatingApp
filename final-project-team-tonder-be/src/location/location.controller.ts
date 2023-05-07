import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Authenticated } from 'src/common/decorators/gettoken.decorator';
import { UserProfileDto } from 'src/user/dto/user-profile.dto';
import { UserRadiusDto } from 'src/user/dto/user-radius.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationService } from './location.service';

@Controller('location')
@ApiTags('Location')
export class LocationController {
  constructor(private readonly _locationService: LocationService) { }

  @Post('create-location')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createLocation(
    @Authenticated() user,
    @Body() createLocationDto: CreateLocationDto
  ): Promise<any> {
    return await this._locationService.createLocation(
      user.id,
      createLocationDto
    );
  }

  @Post('user-within-radius')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getUsersWithinRadius(
    @Body() userRadiusDto: UserRadiusDto,
    @Authenticated() user
  ): Promise<UserProfileDto[]> {
    const { latitude, longitude, radius } = userRadiusDto;
    return this._locationService.findUsersInRadius(
      latitude,
      longitude,
      radius,
      user.id
    );
  }
}
