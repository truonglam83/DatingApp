import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const Authenticated = createParamDecorator(
  async (data: unknown, context: ExecutionContext): Promise<Record<string, any>> => {
    const request = context.switchToHttp().getRequest();
    try {
      // const token = request.headers.authorization.split(' ')[1];
      const token = request.headers.authorization.replace('Bearer ', '');
      const jwtService = new JwtService({ secret: process.env.JWT_SECRET });

      const decoded = jwtService.verify(token);

      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid');
    }
  },
);
