import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { getModelToken, InjectModel, MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Event, EventSchema } from '../schemas/Event.schema';
import { Contract, ContractSchema } from '../schemas/Contract.schema';
import { Connection, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import * as process from 'process';
import { event1, event2, user1 } from '../common/mockdata';
import { HistoryType } from './dto/GetHistory.dto';

describe('TokenService', () => {
  let service: TokenService;
  let mongodb: MongoMemoryServer;
  let contractModel: Model<Contract>;
  let eventModel: Model<Event>;

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService],
      imports: [
        MongooseModule.forRoot(mongodb.getUri('etdstats')),
        MongooseModule.forFeature([
          { name: Event.name, schema: EventSchema },
          { name: Contract.name, schema: ContractSchema },
        ]),
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
    contractModel = module.get<Model<Contract>>(getModelToken(Contract.name));
    eventModel = module.get<Model<Event>>(getModelToken(Event.name));
  });

  afterEach(async () => {
    await contractModel.deleteMany({});
    await eventModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongodb.stop();
  });

  it('Should be able to query events', async () => {
    const contract = await contractModel.create([{ address: '0x123' }]);
    await eventModel.create({
      contract: { id: contract[0]._id },
      ...event1,
    });
    await eventModel.create({
      contract: { id: contract[0]._id },
      ...event2,
    });

    const events = await service.history(contract[0].address, user1);
    expect(events.items.length).toBe(2);
    expect(events.items[0].type).toBe(HistoryType.SEND);
    expect(events.items[1].type).toBe(HistoryType.RECEIVE);
  });

  it('Should be able to return empty array', async () => {
    const contract = await contractModel.create([{ address: '0x123' }]);
    const events = await service.history(contract[0].address, user1);
    expect(events.items.length).toBe(0);
  });
});
