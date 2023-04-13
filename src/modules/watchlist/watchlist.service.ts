import { Injectable } from '@nestjs/common';
import { Watchlist } from './model/watchlist.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist)
    private readonly watchListRepository: typeof Watchlist,
  ) {}

  async createAsset(user, dto) {
    const watchList = {
      user: user.id,
      name: dto.name,
      assetId: dto.assetId,
    };
    await this.watchListRepository.create(watchList);
    return watchList;
  }
}