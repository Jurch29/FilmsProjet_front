import { Component, OnInit, OnDestroy } from '@angular/core';
import { NumberOfItemsInCartService } from 'src/app/core/service/number-of-items-in-cart.service';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Author } from 'src/app/shared/models/author';
import { Actor } from 'src/app/shared/models/actor';
import { Category } from 'src/app/shared/models/category';
import { Trailer } from 'src/app/shared/models/trailer';
import { Movie } from 'src/app/shared/models/movie';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  private id : number;
  private date : string;
  private duration : number;
  private title : string;
  private rating : number;
  private realisators : Author[];
  private actors : Actor[];
  private categories : Category[];
  private synopsis : string ;
  private trailers : Trailer[];

  constructor(private movieService : MovieService, private numberofitemsincartService : NumberOfItemsInCartService, private sanitizer: DomSanitizer) { }

  setProperties(movie : Movie) {
    this.id = movie.movie_id;
    this.date = this.formatDate(movie.movie_date);
    this.duration = movie.movie_duration;
    this.title = movie.movie_title;
    this.rating = movie.movie_mark;
    this.movieService.getAuthorsByMovieId(movie.movie_id).pipe(first()).subscribe(data => this.realisators = data);
    this.movieService.getActorByMovieId(movie.movie_id).pipe(first()).subscribe(data => this.actors = data);
    this.movieService.getCategorysByMovieId(movie.movie_id).pipe(first()).subscribe(data => this.categories = data);
    this.movieService.getTrailersByMovieId(movie.movie_id).pipe(first()).subscribe(data => this.trailers = data);
    this.movieService.getSynopsis(movie.movie_id).pipe(first()).subscribe(data => this.synopsis = data.synopsis);
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

  trailer(trailer : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(trailer);
  }

  addToCart(){
    this.numberofitemsincartService.ChangeNumberOfItemsInCartMessage(this.numberofitemsincartService.getItemsCount()+1);
  }

}
