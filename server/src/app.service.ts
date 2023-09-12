import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Coin {
  code: string;
  rate: number;
  volume: number;
  cap: number;
}

export interface CoinDto {
  currency: string;
  sort: string;
  order: string;
  offset: number;
  limit: number;
  meta: boolean;
}

const coinRequestBody = {
  currency: 'GBP',
  sort: 'rank',
  order: 'ascending',
  offset: 0,
  limit: 5,
  meta: false,
};

@Injectable()
export class AppService {
  apiUrl = 'https://api.livecoinwatch.com/coins/list';
  apiKey = process.env.API_KEY;
  constructor(private http: HttpService) {}

  getCoins(coinDto: CoinDto): Observable<AxiosResponse<Coin[]>> {
    return this.http
      .post(this.apiUrl, coinDto, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': `${this.apiKey}`,
        },
        data: coinRequestBody,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }
}
