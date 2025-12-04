import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from '../../services/app.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDataSource } from '../../database/user.db';
import {join} from "path";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: join(__dirname, '../.env'),
          cache: true,
          expandVariables: true,
      }),
    TypeOrmModule.forRoot({
        ...UsersDataSource.options,
        autoLoadEntities: true,
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
