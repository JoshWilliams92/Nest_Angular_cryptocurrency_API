import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppService, Coin } from './app.service';

const coinRequestBody = {
  currency: 'GBP',
  sort: 'rank',
  order: 'ascending',
  offset: 0,
  limit: 5,
  meta: false,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Crypto API'
  coinForm: FormGroup | undefined;
  coins$: Observable<Coin[]> | undefined;
  coinTicker$ = interval(2000);
  constructor(private fb: FormBuilder,
              private appService: AppService) {}
  ngOnInit(): void {
    this.coinForm = this.fb.group(coinRequestBody);

    this.coins$ = this.coinTicker$.pipe(
      switchMap(() => this.appService.getCoins(this.coinForm!.value))
    )
  }
}
