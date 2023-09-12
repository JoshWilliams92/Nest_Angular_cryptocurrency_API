import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';
import { AppService, Coin, CoinDto } from './app.service';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  defaultRead() {
    // GET request to endpoint not possible
    throw new ForbiddenException();
  }

  @Post()
  getCoins(@Body() coinDto: CoinDto): Observable<AxiosResponse<Coin[]>> {
    return this.appService.getCoins(coinDto);
  }
}
