import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly _authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const client = context.switchToWs().getClient();
    const { userId, room, token } = client.handshake.query;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  }
}
