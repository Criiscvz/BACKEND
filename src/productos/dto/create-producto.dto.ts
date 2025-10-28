export class CreateProductoDto {
  nombre: string;
  marca: string;
  slug: string;
  caracteristicaPrincipal: string;
  descripcion: string;
  fechaElaboracion: Date;
  imagen?: string;
  precio: number;
  stock: number;
  estadoId: number;
  usuarioCreaId: number;
}
