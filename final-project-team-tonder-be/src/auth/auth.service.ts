import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as admin from 'firebase-admin';
import { CreateAuthDto } from './dto/create-auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  // ===================  Convert user object to jwt string ================= //
  async signJwtToken(user: CreateAuthDto): Promise<string> {
    if (!user) throw new BadRequestException('Invalid user');

    const token = await this.jwtService.signAsync(user, {
      expiresIn: this.configService.get('EXPIRED_TIME'),
      secret: this.configService.get('JWT_SECRET'),
    });

    return token;
  }

  async verifyToken(token: string) {
    try {
      const checkToken = await admin.auth().verifyIdToken(token);
      if (!checkToken) {
        throw new BadRequestException('Token is expired');
      }
      return checkToken;
    } catch (err) {
      throw new UnauthorizedException('Token is not authorized');
    }
  }
}
