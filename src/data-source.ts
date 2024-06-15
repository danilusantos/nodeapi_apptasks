import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task } from './entity/Task';

const PostgresAppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.ENV === 'PROD'
    ? 'dpg-cpi7fl21hbls73bdh4v0-a'
    : 'dpg-cpi7fl21hbls73bdh4v0-a.oregon-postgres.render.com',
  port: 5432,
  username: 'db_tarefas_oo8z_user',
  password: 'AeUcgYjbX2Jhh6F8gXDus7oPdLB1mIFL',
  database: 'db_tarefas_oo8z',
  synchronize: true,
  logging: false,
  entities: [Task],
  migrations: [],
  subscribers: [],
});

const SqliteAppDataSource = new DataSource({
  type: 'sqlite',
  database: 'tarefadb.sql',
  synchronize: true,
  logging: true,
  entities: [Task],
  migrations: [],
  subscribers: [],
});

export const AppDataSource =
  process.env.ENV === 'PROD' ? PostgresAppDataSource : SqliteAppDataSource;
