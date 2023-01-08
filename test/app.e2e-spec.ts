import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { Contract } from '../src/schemas/Contract.schema';
import { Event } from '../src/schemas/Event.schema';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongodb: MongoMemoryServer;
  let contractModel: Model<Contract>;
  let eventModel: Model<Event>;

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    process.env.DATABASE_URL = mongodb.getUri('etdstats');
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.skip('/ (GET)', () => {});
});
