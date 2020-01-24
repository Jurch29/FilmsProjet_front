import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumberOfItemsInCartService {
  private NumberOfItemsInCart = new BehaviorSubject<number>(0);

  constructor() { }

  ChangeNumberOfItemsInCartMessage(NumberOfItems: number){
    this.NumberOfItemsInCart.next(NumberOfItems);
  }

  getNumberOfItemsInCart() :  Observable<number>{
    return this.NumberOfItemsInCart.asObservable(); 
  }

  getItemsCount() : number{
    return this.NumberOfItemsInCart.getValue();
  }
}
