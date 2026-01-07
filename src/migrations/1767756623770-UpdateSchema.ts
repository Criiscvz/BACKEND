import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1767756623770 implements MigrationInterface {
    name = 'UpdateSchema1767756623770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variante" DROP COLUMN "fecha_actualizacion"`);
        await queryRunner.query(`ALTER TABLE "variante" DROP COLUMN "usuario_crea_id"`);
        await queryRunner.query(`ALTER TABLE "variante" DROP COLUMN "usuario_actualiza_id"`);
        
        // Agregar columnas como nullable primero
        await queryRunner.query(`ALTER TABLE "variante" ADD "nombre" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "variante" ADD "precio" numeric(10,2)`);
        
        // Actualizar registros existentes con valores por defecto
        await queryRunner.query(`UPDATE "variante" SET "nombre" = 'Estándar' WHERE "nombre" IS NULL`);
        await queryRunner.query(`UPDATE "variante" SET "precio" = 1.00 WHERE "precio" IS NULL`);
        
        // Ahora hacer las columnas NOT NULL
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "nombre" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "precio" SET NOT NULL`);
        
        await queryRunner.query(`ALTER TABLE "variante" ADD "fecha_modificacion" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "direccion_envio" text`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "transporte" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "metodo_pago" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "slug_variante" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "caracteristica_variante" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "fecha_elaboracion_va" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "tiempo_elaboracion" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "personalizable" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "personalizable" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "cotizacion" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "fecha_estimada_entrega" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "usuario_crea_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_6c336b0a51b5c4d22614cb02533"`);
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "rol_id" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_6c336b0a51b5c4d22614cb02533" FOREIGN KEY ("rol_id") REFERENCES "rol"("rol_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_6c336b0a51b5c4d22614cb02533"`);
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "rol_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_6c336b0a51b5c4d22614cb02533" FOREIGN KEY ("rol_id") REFERENCES "rol"("rol_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "usuario_crea_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "fecha_estimada_entrega" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "cotizacion" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "personalizable" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "personalizable" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "tiempo_elaboracion" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "fecha_elaboracion_va" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "caracteristica_variante" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variante" ALTER COLUMN "slug_variante" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "metodo_pago"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "transporte"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "direccion_envio"`);
        await queryRunner.query(`ALTER TABLE "variante" DROP COLUMN "fecha_modificacion"`);
        await queryRunner.query(`ALTER TABLE "variante" DROP COLUMN "precio"`);
        await queryRunner.query(`ALTER TABLE "variante" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "variante" ADD "usuario_actualiza_id" integer`);
        await queryRunner.query(`ALTER TABLE "variante" ADD "usuario_crea_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variante" ADD "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
