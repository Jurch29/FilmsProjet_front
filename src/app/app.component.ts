
import {Component, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetsFilm';

  private messageSource = new Subject<string>();

  constructor() { 
  }

  changeMessage(message: string) {
    console.log("changing message to : "+message);
    this.messageSource.next(message);
  }
  getMessageSource(): Observable<string>{
    return this.messageSource.asObservable(); 
  }
}
