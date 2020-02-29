import { Component, OnInit, OnDestroy } from '@angular/core';
import { LightmodeService } from 'src/app/core/service/lightmode.service';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  subscriptionlightMode: any;
  lightMode: boolean;
  nbMovies :number;
  nbActors :number;
  nbAutors :number;

  constructor(private lightmodeService: LightmodeService,private movieService : MovieService) {}

  ngOnInit(){
    this.subscriptionlightMode =  this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    ); 
    this.movieService.getAllActors().pipe(first()).subscribe(data => {
      this.nbActors = data.length;
    })

    this.movieService.getAllAuthors().pipe(first()).subscribe(data => {
      this.nbAutors = data.length;
    });

    this.movieService.getAllMovies().then(data =>{
      this.nbMovies = data.length;
    })
  }

  ngOnDestroy(){
    this.subscriptionlightMode.unsubscribe();
  }

  totheleft(){
    var scrollLeft = document.getElementById("row").scrollLeft;
    document.getElementById("row").scrollLeft = scrollLeft - document.getElementById("row").offsetWidth;
  }

  totheright(){
    var scrollLeft = document.getElementById("row").scrollLeft;
    document.getElementById("row").scrollLeft = scrollLeft + document.getElementById("row").offsetWidth;
  }

}
