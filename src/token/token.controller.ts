import {
  BadRequestException,
  CacheInterceptor,
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import * as process from 'process';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { TokenService } from './token.service';
import { ethers } from 'ethers';
import { Pagination } from '../common/pagination';
import { GetHistoryDto } from './dto/GetHistory.dto';
import { BlockchainService } from '../blockchain/blockchain.service';
import { GetBalanceDto } from './dto/GetBalance.dto';

@Controller('token')
export class TokenController {
  constructor(
    private tokenService: TokenService,
    private blockchainService: BlockchainService,
  ) {}

  @Get('history')
  @ApiTags('token')
  @ApiExtraModels(GetHistoryDto)
  @ApiExtraModels(Pagination)
  @ApiOkResponse({
    description: 'Find token history',
    schema: {
      type: 'object',
      allOf: [
        {
          $ref: getSchemaPath(Pagination),
        },
        {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                $ref: getSchemaPath(GetHistoryDto),
              },
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid user address',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Invalid user address. The given address is not a valid address.',
        },
      },
    },
  })
  @ApiQuery({
    name: 'userAddress',
    description: 'User address',
    required: true,
  })
  @ApiQuery({
    name: 'per',
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'page',
    description: 'Current page starting from 1',
  })
  getHistory(
    @Query('userAddress') userAddress: string,
    @Query('per', ParseIntPipe) per: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<Pagination<GetHistoryDto>> {
    if (!ethers.utils.isAddress(userAddress)) {
      throw new BadRequestException(
        'Invalid user address. The given address is not a valid address.',
      );
    }
    const checkSummedAddress = ethers.utils.getAddress(userAddress);

    return this.tokenService.history(
      process.env.CONTRACT_ADDRESS,
      checkSummedAddress,
      per,
      page,
    );
  }

  @ApiTags('token')
  @ApiOkResponse({
    description: 'Get the balance of the given address for the given token id',
    type: GetBalanceDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid user address',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Invalid user address. The given address is not a valid address.',
        },
      },
    },
  })
  @ApiQuery({
    name: 'userAddress',
    description: 'User address',
  })
  @ApiQuery({
    name: 'tokenId',
    description: 'Token id',
  })
  @Get('balance')
  async balance(
    @Query('userAddress') userAddress: string,
    @Query('tokenId') tokenId: string,
  ): Promise<GetBalanceDto> {
    if (!ethers.utils.isAddress(userAddress)) {
      throw new BadRequestException(
        'Invalid user address. The given address is not a valid address.',
      );
    }

    if (!ethers.utils.isHexString(tokenId)) {
      throw new BadRequestException(
        'Invalid token id. The given token id is not a valid hex string.',
      );
    }

    const balance = await this.blockchainService.balance(userAddress, tokenId);
    return {
      balance,
      token: tokenId,
      address: userAddress,
    };
  }
}
