import { ApiProperty } from '@nestjs/swagger';

export class GetBalanceDto {
  @ApiProperty({
    description: 'User address',
  })
  address: string;

  @ApiProperty({
    description: 'Token id',
  })
  token: string;

  @ApiProperty({
    description: 'Token balance',
  })
  balance: number;
}
