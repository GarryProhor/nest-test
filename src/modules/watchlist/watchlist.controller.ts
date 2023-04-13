import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchList: WatchlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createAsset(@Body() assetDto: WatchListDTO, @Req() request) {
    const user = request.user;
    return this.watchList.createAsset(user, assetDto);
  }

  /*@Get получаем при логине пользователя*/

  /*@Patch нет необходимости изменять*/

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') assetId: string, @Req() request): Promise<boolean> {
    const { id } = request.user;
    return this.watchList.deleteAsset(id, assetId);
  }
}
