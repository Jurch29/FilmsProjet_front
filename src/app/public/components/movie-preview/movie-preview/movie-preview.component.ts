import { Component, OnInit, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { LightmodeService } from 'src/app/core/service/lightmode.service';
import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit {
  private componentFactory: ComponentFactory<any>;
  someProp: any;
  private componentRef: ComponentRef<any>;
  lightMode: boolean;
  subscriptionlightMode: any;

 
  @ViewChild("infobulecontainer", { static : false,read: ViewContainerRef }) containerinfobule;
  Movies : Movie[];
 
  previewImage = {
    "background-image": ""
  } 
  constructor(private movieService : MovieService,private lightmodeService : LightmodeService, private resolver: ComponentFactoryResolver) {
    this.componentFactory = resolver.resolveComponentFactory(MovieCardComponent);
   }
   ngOnInit() {
    this.previewImage["background-image"] = "url(http://image.tmdb.org/t/p/w500/vloNTScJ3w7jwNwtNGoG8DbTThv.jpg)";
    this.movieService.getAllMovies().pipe(first()).subscribe(data => this.Movies=data);
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(
      dataTransmited => {
        this.lightMode = dataTransmited;
      }
    );
  }
  ngOnDestroy() {
    this.subscriptionlightMode.unsubscribe();
  }
  infobule(movie : Movie){
    this.containerinfobule.clear();
    this.componentRef = this.containerinfobule.createComponent(this.componentFactory, 0);
    this.componentRef.instance.year = movie.movie_date;
    this.componentRef.instance.duration = movie.movie_duration;
    this.componentRef.instance.title = movie.movie_title;
    this.componentRef.instance.rating = movie.movie_mark;
    this.movieService.getAuthorsByMovieId(movie.movie_id).pipe(first()).subscribe(data => this.componentRef.instance.realisators = data);
    this.movieService.getActorByMovieId(movie.movie_id).pipe(first()).subscribe(data => this.componentRef.instance.actors = data );
    this.componentRef.instance.infobulecontainer = this.containerinfobule;
  }
}
