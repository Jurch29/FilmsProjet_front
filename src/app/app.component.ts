
import {Component, OnInit, OnDestroy } from '@angular/core';
import { OpenfilterbarService } from './core/service/openfilterbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'ProjetsFilm';
  openfilterbar : boolean;
  subscriptionfilterbar: any;
  constructor(private openFilterBarService : OpenfilterbarService) {  
  }

  ngOnInit(){
    localStorage.removeItem('userLocalCart');
    this.subscriptionfilterbar = this.openFilterBarService.getOpenFilterBar().subscribe(dataTransmited =>{
      this.openfilterbar = dataTransmited;
    });
  }

  ngOnDestroy(){
    this.subscriptionfilterbar.unsubscribe();
  }
}
