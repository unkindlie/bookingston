import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

const envFile =
    process.env.NODE_ENV === 'production'
        ? '.env.production'
        : '.env.development';
config({ path: envFile });

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.PG_HOST,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT),
    database: process.env.PG_DATABASE_NAME,
    entities: [__dirname + '/../../features/**/*.entity.{ts,js}'],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
    synchronize: process.env.NODE_ENV !== 'production',
    migrationsRun: process.env.NODE_ENV === 'production',
    migrationsTableName: 'Migrations',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
