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


  @ViewChild("infobulecontainer", { static: false, read: ViewContainerRef }) containerinfobule;
  Movies: Movie[];

  constructor(private movieService: MovieService, private lightmodeService: LightmodeService, private resolver: ComponentFactoryResolver) {
    this.componentFactory = resolver.resolveComponentFactory(MovieCardComponent);
  }

  ngOnInit() {
    this.movieService.getAllMovies().pipe(first()).subscribe(data => {
       //console.log("data : "+JSON.stringify(data));
       this.Movies = data;
       console.log(this.Movies);
      }
    );
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(
      dataTransmited => {
        this.lightMode = dataTransmited;
      }
    );
  }
  formatDate(date : Date) {
    let monthNames = [
      "Janvier", "Février", "Mars",
      "Avril", "Mai", "Juin", "Juillet",
      "Âout", "Septembre", "Octobre",
      "Novembre", "Décembre"
    ];
  
    let day = ("0" + date.getDate()).slice(-2);
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
  ngOnDestroy() {
    this.subscriptionlightMode.unsubscribe();
  }
  
  infobule(movie: Movie) {
    this.containerinfobule.clear();
    this.componentRef = this.containerinfobule.createComponent(this.componentFactory, 0);
    this.componentRef.instance.setProperties(movie, this.containerinfobule);
  }

  image(url : string) {
    return {
      "background-image": "url(" + url + ")"
    };
  }
}
