export class CreateUsuarioDto {
    nombre: string;
    apellido: string;
    telefono?: string;
    correoElectronico: string;
    contrasenaFriada: string;
    rolId: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;

}
