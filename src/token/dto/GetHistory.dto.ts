import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../../schemas/Event.schema';
import * as dayjs from 'dayjs';

export enum HistoryType {
  RECEIVE = 'receive',
  SEND = 'send',
}

export class GetHistoryDto {
  @ApiProperty({
    description: 'Token sent from address',
  })
  from: string;
  @ApiProperty({
    description: 'Token received by address',
  })
  to: string;
  @ApiProperty({
    description: 'Token value',
  })
  value: number;

  @ApiProperty({
    description: 'Token id',
  })
  tokenId: string;

  @ApiProperty({
    description: 'Date of transaction',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Transaction Type',
    enum: HistoryType,
  })
  type: HistoryType;

  static fromEvent(event: Event, user: string): GetHistoryDto {
    const [operator, from, to, id, value] = event.data;

    return {
      from: from.value,
      to: to.value,
      value: parseInt(value.value, 16),
      tokenId: id.value,
      timestamp: dayjs(parseInt(event.blockTimestamp, 16) * 1000).format(
        'YYYY-MM-DD HH:mm:ss',
      ),
      type: from.value === user ? HistoryType.SEND : HistoryType.RECEIVE,
    };
  }
}
