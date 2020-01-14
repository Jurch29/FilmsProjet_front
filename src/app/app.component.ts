
import {Component } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetsFilm';

  constructor() { 
  }

}
