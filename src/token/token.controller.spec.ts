import { Test, TestingModule } from '@nestjs/testing';
import { TokenController } from './token.controller';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../schemas/Event.schema';
import { Contract, ContractSchema } from '../schemas/Contract.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { TokenService } from './token.service';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { BlockchainService } from '../blockchain/blockchain.service';

describe('TokenController', () => {
  let controller: TokenController;
  let mongodb: MongoMemoryServer;
  let contractModel: Model<Contract>;
  let eventModel: Model<Event>;

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
      providers: [TokenService, BlockchainService],
      imports: [
        MongooseModule.forRoot(mongodb.getUri('etdstats')),
        MongooseModule.forFeature([
          { name: Event.name, schema: EventSchema },
          { name: Contract.name, schema: ContractSchema },
        ]),
      ],
    }).compile();

    controller = module.get<TokenController>(TokenController);
    await mongoose.connect(mongodb.getUri('etdstats'));

    contractModel = module.get<Model<Contract>>(getModelToken(Contract.name));
    eventModel = module.get<Model<Event>>(getModelToken(Event.name));
  });

  afterEach(async () => {
    // await contractModel.deleteMany({});
    // await eventModel.deleteMany({});
  });

  afterAll(async () => {
    // await mongoose.disconnect();
    await mongodb.stop();
  });

  it('Should throw an error if wallet address is not valid', async () => {
    await expect(() => controller.getHistory('0x123', 1, 1)).toThrowError(
      BadRequestException,
    );
  });

  it('Should not throw an error if wallet address is valid', async () => {
    await expect(() =>
      controller.getHistory('0x10A5768977D843A8592d3D4fd7d1C07E34Ae180a', 1, 1),
    ).not.toThrowError(BadRequestException);
  });
});
