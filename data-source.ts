import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres", // o tu base de datos
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "post123",
    database: "Inovarte",
    entities: ["src/**/*.entity.ts"],
    migrations: ["src/migrations/*.ts"],
});