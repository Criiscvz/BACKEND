import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../enums/rol.enum";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";
import { Roles } from "./roles.decorator";


// Crear el decorador Auth que combina los decoradores de guard y roles, para evitar repetición de código
export function Auth(role: Role){
    return applyDecorators(
        UseGuards(AuthGuard, RolesGuard),
        Roles(role)
    );
}