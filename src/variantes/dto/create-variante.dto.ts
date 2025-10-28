export class CreateVarianteDto {
  productoId: number;
  slugVariante: string;
  caracteristicaVariante: string;
  descripcionVariante?: string;
  fechaElaboracionVa: Date;
  imagenVa?: string;
  tiempoElaboracion: number;
  personalizable: boolean;
  usuarioCreaId: number;
}

