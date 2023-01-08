import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'contracts' })
export class Contract {
  @Prop()
  address: string;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
