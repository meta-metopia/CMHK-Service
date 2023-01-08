import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainModule } from './blockchain/blockchain.module';
import { TokenModule } from './token/token.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

@Module({
  imports: [
    BlockchainModule,
    TokenModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    CacheModule.register<RedisClientOptions>({
      ttl: 30,
      //@ts-ignore
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
