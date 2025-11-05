import { SetMetadata } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enum";

// Definir la clave para los metadatos de roles
export const ROLES_KEY = 'roles';
// Crear el decorador Roles que se utiliza para asignar roles a los controladores
export const Roles = (rolId: Role) => SetMetadata(ROLES_KEY, rolId);