import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Contract } from './Contract.schema';
import * as mongoose from 'mongoose';

class ContractRef {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Contract' })
  id: Contract;
}

@Schema({
  collection: 'events',
})
export class Event {
  @Prop()
  event: string;

  @Prop()
  data: { name: string; value: any; type: string }[];

  @Prop()
  blockTimestamp: string;

  @Prop()
  contract: ContractRef;
}

export const EventSchema = SchemaFactory.createForClass(Event);
