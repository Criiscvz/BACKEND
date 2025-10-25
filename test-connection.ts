import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
console.log(`Base de datos: ${AppDataSource.options.database}`);
console.log(`Host: ${(AppDataSource.options as any).host}`);
console.log(`Puerto: ${(AppDataSource.options as any).port}`);

    return AppDataSource.destroy();
  })
  .catch((error) => {
    console.error('❌ Error al conectar a la base de datos:', error);
  });