export class UpdateVarianteDto {
  productoId?: number;
  slugVariante?: string;
  caracteristicaVariante?: string;
  descripcionVariante?: string;
  fechaElaboracionVa?: Date;
  imagenVa?: string;
  tiempoElaboracion?: number;
  personalizable?: boolean;
  usuarioActualizaId?: number;
}

