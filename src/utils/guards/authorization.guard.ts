import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token missing');
    }

    const [, token] = authHeader.split(' ');

    try {
      const user = this.jwtService.verify(token);
      req.user = {
        id: user.id,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token!');
    }
  }
}
