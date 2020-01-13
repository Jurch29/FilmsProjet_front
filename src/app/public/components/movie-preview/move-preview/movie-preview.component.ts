import { Component, OnInit, ComponentFactory, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MovieCardComponent } from '../movie-card/movie-card/movie-card.component';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit {
  container:any;
  private componentFactory: ComponentFactory<any>;
  someProp: any;
  private componentRef: ComponentRef<any>;

  lightMode: boolean;
  subscriptionlightMode: any;
  
  url:string;
  title:string;
  year:string;
  rating:number;
  previewImage = {
    "background-image": ""
  } 
  constructor(private appComponent : AppComponent, private resolver: ComponentFactoryResolver) {
    this.componentFactory = resolver.resolveComponentFactory(MovieCardComponent);
   }
  ngOnInit() {

    this.previewImage["background-image"] = "url("+this.url+")";
    
    this.subscriptionlightMode = this.appComponent.getLightModeEventMessage().subscribe(dataTransmited =>{
      this.lightMode = dataTransmited;
    });
  }
  ngOnDestroy() {
    this.subscriptionlightMode.unsubscribe();
    this.componentRef.destroy();
  }
  infobule(){
    this.container.clear();
    this.componentRef = this.container.createComponent(this.componentFactory, 0);
    this.componentRef.instance.container = this.container;
  }
}
