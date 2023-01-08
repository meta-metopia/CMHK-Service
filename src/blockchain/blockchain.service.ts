import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as abi from './abi.json';

@Injectable()
export class BlockchainService {
  /**
   * Call smart contract function to check balance
   */
  async balance(userAddress: string, tokenId: string): Promise<number> {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const contract = new ethers.Contract(contractAddress, abi.abi, provider);
    const balance = await contract.balanceOf(userAddress, tokenId);
    // convert big number to number
    return balance.toNumber();
  }
}
