import { Component, OnInit, ComponentFactory, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { LightmodeService } from 'src/app/core/service/lightmode.service';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit {
  containerinfobule:any;
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
  constructor(private lightmodeService : LightmodeService, private resolver: ComponentFactoryResolver) {
    this.componentFactory = resolver.resolveComponentFactory(MovieCardComponent);
   }
  ngOnInit() {

    this.previewImage["background-image"] = "url("+this.url+")";
    
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(dataTransmited =>{
      this.lightMode = dataTransmited;
    });
  }
  ngOnDestroy() {
    this.subscriptionlightMode.unsubscribe();
  }
  infobule(event){
    this.containerinfobule.clear();
    this.componentRef = this.containerinfobule.createComponent(this.componentFactory, 0);
    this.componentRef.instance.infobulecontainer = this.containerinfobule;
  }
}
