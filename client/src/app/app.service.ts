import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

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

@Injectable()
export class AppService {
    apiUrl = 'http://localhost:3000'
    constructor(private http: HttpClient) {}
    getCoins(coindDto: CoinDto): Observable<Coin[]> {
        return this.http.post<Coin[]>(this.apiUrl, coindDto)
    }  
}