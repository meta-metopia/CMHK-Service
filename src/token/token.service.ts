import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '../schemas/Event.schema';
import { Model } from 'mongoose';
import { generatePagination, Pagination } from '../common/pagination';
import { GetHistoryDto } from './dto/GetHistory.dto';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}
  async history(
    contractAddress: string,
    userAddress: string,
    per = 10,
    page = 1,
  ): Promise<Pagination<GetHistoryDto>> {
    const pipeline = [
      {
        $lookup: {
          from: 'contracts',
          localField: 'contract.id',
          foreignField: '_id',
          as: 'contract',
        },
      },
      {
        $unwind: {
          path: '$contract',
          includeArrayIndex: 'string',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          'contract.address': contractAddress,
          'data.value': userAddress,
        },
      },
      {
        $unset: 'contract',
      },
    ];

    const query = () =>
      this.eventModel.aggregate(pipeline).sort({ blockTimestamp: -1 });
    const total = await query().count('count').exec();
    const events = await query()
      .skip((page - 1) * per)
      .limit(per)
      .exec();
    const getEventsDto = events.map((event) =>
      GetHistoryDto.fromEvent(event, userAddress),
    );

    if (total.length === 0) {
      return generatePagination<GetHistoryDto>([], 0, per, page);
    }

    return generatePagination(getEventsDto, total[0].count, page, per);
  }
}
