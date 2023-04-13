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

  @Get('/get-all')
  getAllAssets() {
    return;
  }

  @Patch('/update')
  updateAsset() {
    return;
  }

  @Delete('/:id')
  deleteAsset(@Query('id') id: string) {
    return;
  }
}
