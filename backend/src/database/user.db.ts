import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import {User} from '../entities/user.entity';

const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: join(__dirname, '../../database.sqlite'),
    entities: [User],
    migrations: [join(__dirname, '..', 'migration', '*{.ts,.js}')],
    migrationsTableName: 'migrations',
    synchronize: false,
    logging: true,
};

export const UsersDataSource = new DataSource(dataSourceOptions);