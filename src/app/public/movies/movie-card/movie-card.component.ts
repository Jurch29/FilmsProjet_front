import { Component,OnInit, OnDestroy } from '@angular/core';
import { NumberOfItemsInCartService } from 'src/app/core/service/number-of-items-in-cart.service';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Author } from 'src/app/shared/models/author';
import { Actor } from 'src/app/shared/models/actor';
import { Category } from 'src/app/shared/models/category';
import { Movie } from 'src/app/shared/models/movie';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { CartService } from 'src/app/core/service/cart.service';
import { LightmodeService } from 'src/app/core/service/lightmode.service';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit,OnDestroy{
  infobulecontainer : any;
  lightMode:any;
  private id : number;
  private date : string;
  private duration : number;
  private title : string;
  private rating : number;
  private realisators : Author[];
  private actors : Actor[];
  private categories : Category[];
  private synopsis : string ;
  private trailer : string;
  subscriptionlightMode: any;
  queryToDetails: string;

  constructor(private lightmodeService: LightmodeService,private movieService : MovieService, private authenticationService : AuthenticationService, private cartService : CartService, private numberofitemsincartService : NumberOfItemsInCartService, private sanitizer: DomSanitizer) { }

 
  ngOnInit() {
    this.subscriptionlightMode =  this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
  }
  ngOnDestroy(){
    this.subscriptionlightMode.unsubscribe();
  }
  
  setProperties(movie : Movie, container) {
    this.id = movie.movieId;
    this.date = this.formatDate(movie.movieDate);
    this.trailer = movie.movieTrailerPath;
    this.duration = movie.movieDuration;
    this.title = movie.movieTitle;
    this.rating = movie.movieMark;
    this.actors = movie.actors;
    this.realisators = movie.authors;
    this.categories = movie.categories;
    
    this.movieService.getSynopsis(movie.movieId).pipe(first()).subscribe(data => this.synopsis = data.synopsis);
    this.infobulecontainer = container;
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

  addToCart(){
    console.log(this.authenticationService.currentUserValue);
    this.cartService.addItemToCart(this.authenticationService.currentUserValue.userId, this.id)
    .pipe()
    .subscribe(
      data => {
        this.cartService.getUserCart(this.authenticationService.currentUserValue.userId)
        .pipe()
        .subscribe(
          data => {
            let numberOfItems = 0;
            for (let item of data) {
              numberOfItems += item.movieUserCartCount;
            }
            this.numberofitemsincartService.ChangeNumberOfItemsInCartMessage(numberOfItems);
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }

  close() {
    this.infobulecontainer.clear();
  }
 
}
