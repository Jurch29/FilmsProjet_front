import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/shared/models/author';
import { Actor } from 'src/app/shared/models/actor';
import { Category } from 'src/app/shared/models/category';
import { Trailer } from 'src/app/shared/models/trailer';
import { LightmodeService } from 'src/app/core/service/lightmode.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { CartService } from 'src/app/core/service/cart.service';
import { NumberOfItemsInCartService } from 'src/app/core/service/number-of-items-in-cart.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit,OnDestroy {
  lightMode: any;
  private id: number;
  private date: string;
  private duration: number;
  private title: string;
  private rating: number;
  private realisators: Author[];
  private actors: Actor[];
  private categories: Category[];
  private synopsis: string;
  private trailers: Trailer[];
  subscriptionlightMode: any;
  movie: any;
 
  constructor(private lightmodeService: LightmodeService, private authenticationService: AuthenticationService, private cartService: CartService, private numberofitemsincartService: NumberOfItemsInCartService, private sanitizer: DomSanitizer, private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.pipe(first()).subscribe(data => this.id = data.movieID)

    this.movieService.getMovieById(this.id).pipe(first()).subscribe(data => {
      this.movie = data;
      this.setupMoviedetails();
    });
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(dataTransmited =>{
      this.lightMode = dataTransmited;
    });
  }
  setupMoviedetails(){
    this.date = this.formatDate(this.movie.movieDate);
    this.duration = this.movie.movieDuration;
    this.title = this.movie.movieTitle;
    this.rating = this.movie.movieMark;
    this.actors = this.movie.actors;
    this.realisators = this.movie.authors;
    this.categories = this.movie.categories;
    this.trailer = this.movie.movieTrailerPath;
    
    this.movieService.getSynopsis(this.movie.movieId).pipe(first()).subscribe(data => this.synopsis = data.synopsis);
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
  ngOnDestroy(): void {
    this.subscriptionlightMode.unsubscribe();
  }
}
