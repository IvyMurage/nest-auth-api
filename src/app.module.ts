import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath:'.env',
  }),

  JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory: async(configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET')
    }),
    global:true,
    inject: [ConfigService],
  }),
  
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory:  (configService: ConfigService) => ({
      uri: configService.get('DB_CONNECTION_STRING')
    }),
    inject: [ConfigService],
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
