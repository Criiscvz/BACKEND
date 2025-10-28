export class CreateUsuarioDto {
  nombre: string;
  apellido: string;
  telefono?: string;
  correoElectronico: string;
  contrasenaFriada: string;
  estadoCuenta?: boolean;
  rolId: number;
  usuarioCreaId: number;
  usuarioActualizaId?: number;
}

