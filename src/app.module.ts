import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainModule } from './blockchain/blockchain.module';
import { TokenModule } from './token/token.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';

@Module({
  imports: [
    BlockchainModule,
    TokenModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
