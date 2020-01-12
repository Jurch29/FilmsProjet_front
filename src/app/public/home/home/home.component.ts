import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
 

  lightMode: boolean;
  subscriptionlightMode: any;
  constructor(private appComponent : AppComponent) { }

  ngOnInit() {
    this.subscriptionlightMode = this.appComponent.getLightModeEventMessage().subscribe(dataTransmited =>{
      this.lightMode = dataTransmited;
    });
  }
  ngOnDestroy() {
    this.subscriptionlightMode.unsubscribe();
  }
}
