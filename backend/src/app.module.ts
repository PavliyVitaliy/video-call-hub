import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/entities/user.entity';
import { ChatModule } from './chat/chat.module';

const { env } = process;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${env.ENV}.env`
   }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.POSTGRES_HOST,
      port: parseInt(env.POSTGRES_PORT, 10),
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      entities: [UserEntity],
      autoLoadEntities: true,
      synchronize: true,
  }),
    UsersModule,
    RoomsModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
