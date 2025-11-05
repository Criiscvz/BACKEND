import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const roles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no se requieren roles, permitir el acceso
    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Si el usuario es ADMIN, permitir el acceso, lo que anula otras restricciones de rol
    if (user.rolId === Role.ADMIN) {
      return true;
    }

    // retornar si el rol del usuario coincide con el rol requerido
    return roles === user.rolId;
  }
}
