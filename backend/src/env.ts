import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';

const { env } = process;

export const HTTP_PORT = env.APP_HTTP_PORT || '3000';

export const ENV = process.env.ENV

export const PRIVATE_KEY = process.env.PRIVATE_KEY || 'SECRET'

export const typeOrmModuleOptions = {
    type: 'postgres',
    host: env.POSTGRES_HOST,
    port: parseInt(env.POSTGRES_PORT, 10),
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_NAME,
    entities: [UserEntity],
    autoLoadEntities: false,
    cli: { migrationsDir: 'migrations' },
} as TypeOrmModuleOptions;
