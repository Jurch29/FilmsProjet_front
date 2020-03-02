import { Component, OnInit, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewChild, ViewContainerRef, HostListener, OnDestroy } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { LightmodeService } from 'src/app/core/service/lightmode.service';
import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit,OnDestroy {
  private componentFactory: ComponentFactory<any>;
  someProp: any;
  private componentRef: ComponentRef<any>;
  lightMode: boolean;
  subscriptionlightMode: any;

  @ViewChild("infobulecontainer", { static: false, read: ViewContainerRef }) containerinfobule;
  infoBulleMovieId: number;

  constructor(private route: Router,private movieService: MovieService,
    private lightmodeService: LightmodeService, private resolver: ComponentFactoryResolver,public datepipe: DatePipe) {
    this.componentFactory = resolver.resolveComponentFactory(MovieCardComponent);
  }
 
  ngOnInit() {
    this.movieService.getAllMovies().then(data=>{
      this.movieService.ChangeMoviesToDisplay(data);
    });
    this.subscriptionlightMode =  this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
  }

  ngOnDestroy(){
    this.subscriptionlightMode.unsubscribe();
  }

  formatDate(strDate : string) {
    let date = new Date(strDate);
    let formattedDate =this.datepipe.transform(date, 'dd-MM-yyyy');
    return formattedDate;
  }

  infobule(movie: Movie) {
    if(window.innerWidth < 900){
      this.route.navigate(["/nowMoreMovie/",movie.movieId]);
    }else{
      this.componentRef = null;
      this.infoBulleMovieId = movie.movieId;
      this.containerinfobule.clear();
      this.componentRef = this.containerinfobule.createComponent(this.componentFactory, 0);
      this.componentRef.instance.setProperties(movie, this.containerinfobule);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 900) {
      if(this.componentRef !=null){
        this.componentRef = null;
        this.containerinfobule.clear();
        this.route.navigate(["/nowMoreMovie/",this.infoBulleMovieId]);
      }
    }
  }

  image(url : string) {
    return {
      "background-image": "url(" + url + ")"
    };
  }

}