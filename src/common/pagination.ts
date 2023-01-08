import { ApiProperty } from '@nestjs/swagger';

export class Metadata {
  @ApiProperty({
    description: 'Total number of items',
  })
  total: number;
  @ApiProperty({
    description: 'Number of items per page',
    default: 10,
  })
  per: number;
  @ApiProperty({
    description: 'Current page starting from 1',
    default: 1,
  })
  page: number;
  @ApiProperty({
    description: 'Total number of pages',
  })
  totalPage: number;
}

export class Pagination<T> {
  @ApiProperty({
    description: 'Pagination data',
  })
  metadata: Metadata;
  items: T[];
}

export function generatePagination<T>(
  items: T[],
  total: number,
  page: number,
  per: number,
): Pagination<T> {
  return {
    metadata: {
      total,
      per,
      page,
      totalPage: Math.ceil(total / per),
    },
    items,
  };
}
