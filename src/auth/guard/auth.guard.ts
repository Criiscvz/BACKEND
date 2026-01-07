import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtConstants } from '../constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
  ) { }

  // Verifica si la solicitud tiene un token JWT válido
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {

      //antigiuo codigo:
      //const payload = await this.jwtService.verifyAsync(
      //token,
      //{
      //  secret: JwtConstants.secret,
      //}
      //);

      // El verifyAsync usará la configuración que definiste en el módulo
      const payload = await this.jwtService.verifyAsync(token);

      //request obtine una propiedad nueva llamada user y le asigna el payload
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }


  // Extrae el token del encabezado Authorization
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }


}
