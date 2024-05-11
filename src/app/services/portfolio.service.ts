import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private _scrollAmount: number = -1;
  public get scrollAmount(): number {
    return this._scrollAmount;
  }
  public set scrollAmount(value: number) {
    this._scrollAmount = value;
  }

  constructor() { }
}
