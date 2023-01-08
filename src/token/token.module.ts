import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../schemas/Event.schema';
import { BlockchainService } from '../blockchain/blockchain.service';

@Module({
  controllers: [TokenController],
  providers: [TokenService, BlockchainService],
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
})
export class TokenModule {}
