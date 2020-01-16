import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenfilterbarService {

  private openFilterBar = new Subject<boolean>();

  constructor() { }

  ChangeOpenFilterBarMessage(openFilterBar: boolean){
    this.openFilterBar.next(openFilterBar);
  }
  getOpenFilterBar() :  Observable<boolean>{
    return this.openFilterBar.asObservable(); 
  }
  
}
