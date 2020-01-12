import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit {

  lightMode: boolean;
  subscriptionlightMode: any;

  url:string;
  title:string;
  year:string;
  rating:number;
  previewImage = {
    "background-image": ""
  } 
  constructor(private appComponent : AppComponent ) { }

  ngOnInit() {

    this.previewImage["background-image"] = "url("+this.url+")";
    
    this.subscriptionlightMode = this.appComponent.getLightModeEventMessage().subscribe(dataTransmited =>{
      this.lightMode = dataTransmited;
    });
  }
  ngOnDestroy() {
    this.subscriptionlightMode.unsubscribe();
  }
    
}
