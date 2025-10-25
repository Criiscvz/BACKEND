import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1760555033700 implements MigrationInterface {
    name = 'InitialSchema1760555033700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "direccion" ("direccion_id" SERIAL NOT NULL, "usuario_id" integer NOT NULL, "calle_principal" character varying(200) NOT NULL, "avenida" character varying(200), "ciudad" character varying(100) NOT NULL, "provincia" character varying(100) NOT NULL, "pais" character varying(100) NOT NULL, "fecha_registro_direccion" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_acd94fee8aad10e9468572704ac" PRIMARY KEY ("direccion_id"))`);
        await queryRunner.query(`CREATE TABLE "estado" ("estado_id" SERIAL NOT NULL, "nombre" character varying(50) NOT NULL, "tipo" character varying(50) NOT NULL, CONSTRAINT "PK_68ecff2f41cadec7e8f69d82607" PRIMARY KEY ("estado_id"))`);
        await queryRunner.query(`CREATE TABLE "producto" ("producto_id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "marca" character varying(100) NOT NULL, "slug" character varying(150) NOT NULL, "caracteristica_principal" character varying(200) NOT NULL, "descripcion" text NOT NULL, "fecha_elaboracion" date NOT NULL, "imagen" character varying(255), "precio" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "estado_id" integer NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_crea_id" integer NOT NULL, "usuario_actualiza_id" integer, CONSTRAINT "UQ_a3920557aedc072cb965f898332" UNIQUE ("slug"), CONSTRAINT "PK_2415b88c222785d1f2da05acff9" PRIMARY KEY ("producto_id"))`);
        await queryRunner.query(`CREATE TABLE "variante" ("variante_id" SERIAL NOT NULL, "producto_id" integer NOT NULL, "slug_variante" character varying(150) NOT NULL, "caracteristica_variante" character varying(200) NOT NULL, "descripcion_variante" text, "fecha_elaboracion_va" date NOT NULL, "imagen_va" character varying(255), "tiempo_elaboracion" integer NOT NULL, "personalizable" boolean NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_crea_id" integer NOT NULL, "usuario_actualiza_id" integer, CONSTRAINT "PK_399d83f73aae224f3d3a807abe3" PRIMARY KEY ("variante_id"))`);
        await queryRunner.query(`CREATE TABLE "detalle_pedido" ("detalle_pedido_id" SERIAL NOT NULL, "variante_id" integer NOT NULL, "pedido_id" integer NOT NULL, "cantidad" integer NOT NULL, "precio" numeric(10,2) NOT NULL, "fecha_agregado_pedido" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_94e062e47428c7a012032e96cbc" PRIMARY KEY ("detalle_pedido_id"))`);
        await queryRunner.query(`CREATE TABLE "detalle_factura" ("detalle_factura_id" SERIAL NOT NULL, "factura_id" integer NOT NULL, "variante_id" integer NOT NULL, "cantidad" integer NOT NULL, "precio_unitario" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, CONSTRAINT "PK_7ddaab4af47e6cc9e1f9293afa1" PRIMARY KEY ("detalle_factura_id"))`);
        await queryRunner.query(`CREATE TABLE "devolucion" ("devolucion_id" SERIAL NOT NULL, "factura_id" integer NOT NULL, "variante_id" integer NOT NULL, "motivo" text NOT NULL, "fecha_devolucion" date NOT NULL, "estado_id" integer NOT NULL, "usuario_crea_id" integer NOT NULL, CONSTRAINT "PK_1ff5bc5005377c5989722651a94" PRIMARY KEY ("devolucion_id"))`);
        await queryRunner.query(`CREATE TABLE "factura" ("factura_id" SERIAL NOT NULL, "pedido_id" integer NOT NULL, "fecha_emision" TIMESTAMP NOT NULL DEFAULT now(), "subtotal" numeric(10,2) NOT NULL, "iva" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "estado_id" integer NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_crea_id" integer NOT NULL, "usuario_actualiza_id" integer, CONSTRAINT "UQ_49796daacafb402b1336954dd9a" UNIQUE ("pedido_id"), CONSTRAINT "REL_49796daacafb402b1336954dd9" UNIQUE ("pedido_id"), CONSTRAINT "PK_b76c97cfac9ca5bd0cd62fa9b35" PRIMARY KEY ("factura_id"))`);
        await queryRunner.query(`CREATE TABLE "pedido" ("pedido_id" SERIAL NOT NULL, "usuario_id" integer NOT NULL, "contenido_total" numeric(10,2) NOT NULL, "estado_id" integer NOT NULL, "cotizacion" boolean NOT NULL, "fecha_estimada_entrega" date NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_crea_id" integer NOT NULL, "usuario_actualiza_id" integer, CONSTRAINT "PK_dc35c54d515c6d9474e75a34ff8" PRIMARY KEY ("pedido_id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("usuario_id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "apellido" character varying(100) NOT NULL, "telefono" character varying(20), "correo_electronico" character varying(255) NOT NULL, "contrasena_friada" character varying(255) NOT NULL, "estado_cuenta" boolean NOT NULL DEFAULT true, "rol_id" integer NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_crea_id" integer NOT NULL, "usuario_actualiza_id" integer, CONSTRAINT "UQ_656a48ae9eacaf9e820af18d24c" UNIQUE ("correo_electronico"), CONSTRAINT "PK_877d906b2b8b32d99cf7164ec19" PRIMARY KEY ("usuario_id"))`);
        await queryRunner.query(`CREATE TABLE "rol" ("rol_id" SERIAL NOT NULL, "nombre" character varying(50) NOT NULL, "descripcion" character varying(200), CONSTRAINT "UQ_9792c580a992d554ee1621c5b45" UNIQUE ("nombre"), CONSTRAINT "PK_69836b191b6c07ec3fd08de3a1a" PRIMARY KEY ("rol_id"))`);
        await queryRunner.query(`CREATE TABLE "historial" ("historial_id" SERIAL NOT NULL, "tabla_afectada" character varying(100) NOT NULL, "registro_id" integer NOT NULL, "accion" character varying(50) NOT NULL, "usuario_id" integer NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "descripcion" text NOT NULL, CONSTRAINT "PK_fec10374c9e3e684ba28665b780" PRIMARY KEY ("historial_id"))`);
        await queryRunner.query(`ALTER TABLE "direccion" ADD CONSTRAINT "FK_2c5855a442b025a6076018deba6" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_a3f57ae3dbfd1583fa4d69bbead" FOREIGN KEY ("estado_id") REFERENCES "estado"("estado_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variante" ADD CONSTRAINT "FK_54d83dfe4f3475d547958d88de2" FOREIGN KEY ("producto_id") REFERENCES "producto"("producto_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" ADD CONSTRAINT "FK_244b5a4b91e7b66c616bdafa965" FOREIGN KEY ("variante_id") REFERENCES "variante"("variante_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" ADD CONSTRAINT "FK_17fc57ebe34e3bcf93c7ff79673" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("pedido_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_factura" ADD CONSTRAINT "FK_dbafce9600e04956a057b618060" FOREIGN KEY ("factura_id") REFERENCES "factura"("factura_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_factura" ADD CONSTRAINT "FK_71a7729bad41f0f8bd22ae5f364" FOREIGN KEY ("variante_id") REFERENCES "variante"("variante_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "devolucion" ADD CONSTRAINT "FK_2deff16eca071ff8588b037449a" FOREIGN KEY ("factura_id") REFERENCES "factura"("factura_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "devolucion" ADD CONSTRAINT "FK_d85786d18c098a28b02f449b44c" FOREIGN KEY ("variante_id") REFERENCES "variante"("variante_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "devolucion" ADD CONSTRAINT "FK_fe0c2fe6e9d8619bd9fac1c7f16" FOREIGN KEY ("estado_id") REFERENCES "estado"("estado_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "factura" ADD CONSTRAINT "FK_49796daacafb402b1336954dd9a" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("pedido_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "factura" ADD CONSTRAINT "FK_ffdaece472fa8196a4b179b9611" FOREIGN KEY ("estado_id") REFERENCES "estado"("estado_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_a76ebc7864e48113c6b27cf47a9" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_ffbc54a16fe3f709d8298f30da1" FOREIGN KEY ("estado_id") REFERENCES "estado"("estado_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_6c336b0a51b5c4d22614cb02533" FOREIGN KEY ("rol_id") REFERENCES "rol"("rol_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "historial" ADD CONSTRAINT "FK_afdafbb2b60c5f36d2eba53c312" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "historial" DROP CONSTRAINT "FK_afdafbb2b60c5f36d2eba53c312"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_6c336b0a51b5c4d22614cb02533"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_ffbc54a16fe3f709d8298f30da1"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_a76ebc7864e48113c6b27cf47a9"`);
        await queryRunner.query(`ALTER TABLE "factura" DROP CONSTRAINT "FK_ffdaece472fa8196a4b179b9611"`);
        await queryRunner.query(`ALTER TABLE "factura" DROP CONSTRAINT "FK_49796daacafb402b1336954dd9a"`);
        await queryRunner.query(`ALTER TABLE "devolucion" DROP CONSTRAINT "FK_fe0c2fe6e9d8619bd9fac1c7f16"`);
        await queryRunner.query(`ALTER TABLE "devolucion" DROP CONSTRAINT "FK_d85786d18c098a28b02f449b44c"`);
        await queryRunner.query(`ALTER TABLE "devolucion" DROP CONSTRAINT "FK_2deff16eca071ff8588b037449a"`);
        await queryRunner.query(`ALTER TABLE "detalle_factura" DROP CONSTRAINT "FK_71a7729bad41f0f8bd22ae5f364"`);
        await queryRunner.query(`ALTER TABLE "detalle_factura" DROP CONSTRAINT "FK_dbafce9600e04956a057b618060"`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" DROP CONSTRAINT "FK_17fc57ebe34e3bcf93c7ff79673"`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" DROP CONSTRAINT "FK_244b5a4b91e7b66c616bdafa965"`);
        await queryRunner.query(`ALTER TABLE "variante" DROP CONSTRAINT "FK_54d83dfe4f3475d547958d88de2"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_a3f57ae3dbfd1583fa4d69bbead"`);
        await queryRunner.query(`ALTER TABLE "direccion" DROP CONSTRAINT "FK_2c5855a442b025a6076018deba6"`);
        await queryRunner.query(`DROP TABLE "historial"`);
        await queryRunner.query(`DROP TABLE "rol"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "pedido"`);
        await queryRunner.query(`DROP TABLE "factura"`);
        await queryRunner.query(`DROP TABLE "devolucion"`);
        await queryRunner.query(`DROP TABLE "detalle_factura"`);
        await queryRunner.query(`DROP TABLE "detalle_pedido"`);
        await queryRunner.query(`DROP TABLE "variante"`);
        await queryRunner.query(`DROP TABLE "producto"`);
        await queryRunner.query(`DROP TABLE "estado"`);
        await queryRunner.query(`DROP TABLE "direccion"`);
    }

}
