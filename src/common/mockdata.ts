export const user1 = '0x1';
export const user2 = '0x2';

export const event1 = {
  data: [
    {
      name: '_operator',
      value: '0x0',
      type: 'address',
      indexed: true,
    },
    {
      name: '_from',
      value: user1,
      type: 'address',
      indexed: true,
    },
    {
      name: '_to',
      value: user2,
      type: 'address',
      indexed: true,
    },
    {
      name: '_id',
      value: '0x1',
      type: 'uint256',
      indexed: false,
    },
    {
      name: '_value',
      value: '0x1',
      type: 'uint256',
      indexed: false,
    },
  ],
  blockHash: '0x1',
  event: 'TransferSingle',
  blockNumber: '0x1',
  transaction: {
    hash: '0x1',
    index: '0x0',
    from: '0x1',
    to: '0x2',
    value: '0x00',
  },
  blockTimestamp: '0x6358bef9',
};

export const event2 = {
  data: [
    {
      name: '_operator',
      value: '0x0',
      type: 'address',
      indexed: true,
    },
    {
      name: '_from',
      value: user2,
      type: 'address',
      indexed: true,
    },
    {
      name: '_to',
      value: user1,
      type: 'address',
      indexed: true,
    },
    {
      name: '_id',
      value: '0x1',
      type: 'uint256',
      indexed: false,
    },
    {
      name: '_value',
      value: '0x1',
      type: 'uint256',
      indexed: false,
    },
  ],
  blockHash: '0x2',
  event: 'TransferSingle',
  blockNumber: '0x2',
  transaction: {
    hash: '0x1',
    index: '0x0',
    from: '0x1',
    to: '0x2',
    value: '0x00',
  },
  blockTimestamp: '0x6358bef9',
};
