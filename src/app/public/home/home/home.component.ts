import { Component, ViewChild, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, OnDestroy, ComponentRef } from '@angular/core';
import { MoviePreviewComponent } from '../../components/movie-preview/move-preview/movie-preview.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
 
  @ViewChild("moviecontainer", { static : false,read: ViewContainerRef }) container;
  @ViewChild("infobulecontainer", { static : false,read: ViewContainerRef }) containerinfobule;
  
  private componentFactory: ComponentFactory<any>
  private componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) {
    this.componentFactory = resolver.resolveComponentFactory(MoviePreviewComponent);
   }

  
  CreateCompenentMovie() {
    this.componentRef = this.container.createComponent(this.componentFactory, 0);
    this.componentRef.instance.url = 'http://image.tmdb.org/t/p/w500/vloNTScJ3w7jwNwtNGoG8DbTThv.jpg';
    this.componentRef.instance.title = 'Malefique';
    this.componentRef.instance.year = '2018';
    this.componentRef.instance.rating = 3;
    this.componentRef.instance.containerinfobule=this.containerinfobule;
  }
  ngOnDestroy() {
   }
}
