import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('DB_HOST') || 'localhost',
          port: +config.get('DB_PORT') || 5432,
          username: config.get('DB_USER') || 'postgres',
          password: config.get('DB_PW') || 'custompassword',
          database: config.get('DB_NAME') || 'postgres',
          entities: [],
          // synchronize: config.get('NODE_ENV') == 'LOCAL' ? true : false,
          keepConnectionAlive: true,
          retryAttempts: 2,
          retryDelay: 1000,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
