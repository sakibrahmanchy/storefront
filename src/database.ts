import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE_NAME || 'store_db',
  entities: ['dist/**/*.entity.{ts,js}'],
  migrationsRun: true,
  synchronize: false,
  migrations: [`${__dirname}/migrations/**/*{.ts, .js}`],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = ormConfig;
