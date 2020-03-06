import { Component, OnInit, OnDestroy } from '@angular/core';
import { LightmodeService } from 'src/app/core/service/lightmode.service';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Movie } from 'src/app/shared/models/movie';

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
  movies : Movie[];
  
  constructor(private lightmodeService: LightmodeService,private movieService : MovieService,public datepipe: DatePipe) {}

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

    this.movieService.getTopMovies().pipe(first()).subscribe(data => {
      this.movies = data;
    });
  }

  formatDate(strDate : string) {
    var re = /0000/gi; 
    strDate = strDate.replace(re, "00:00");
    let date = new Date(strDate);
    let formattedDate =this.datepipe.transform(date, 'dd-MM-yyyy');
    return formattedDate;
  }

  image(url : string) {
    return {
      "background-image": "url(" + url + ")"
    };
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
