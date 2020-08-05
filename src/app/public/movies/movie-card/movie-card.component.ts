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
import { DatePipe } from '@angular/common';
import { CartItem } from 'src/app/shared/models/cart-item';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit,OnDestroy{
  infobulecontainer : any;
  lightMode:any;
  public id : number;
  public date : string;
  public duration : number;
  public title : string;
  public rating : number;
  public realisators : Author[];
  public actors : Actor[];
  public categories : Category[];
  public synopsis : string ;
  public trailer : string;
  subscriptionlightMode: any;
  queryToDetails: string;
  safeContent: any;

  constructor(private lightmodeService: LightmodeService,private movieService : MovieService, 
              private authenticationService : AuthenticationService, private cartService : CartService,
              private numberofitemsincartService : NumberOfItemsInCartService, private sanitizer: DomSanitizer,
              public datepipe: DatePipe) { }

 
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
    this.safeContent =  this.sanitizer.bypassSecurityTrustResourceUrl(this.trailer);
    this.movieService.getSynopsis(movie.movieId).pipe(first()).subscribe(
      data => {
        this.synopsis = data.movieDescription
      },
      error => {
        console.log(error)
      });
    this.infobulecontainer = container;
  }
 
  formatDate(srtdate: Date) {
    var re = /0000/gi; 
    let date = new Date(srtdate.toString().replace(re, "00:00"));
    let formattedDate =this.datepipe.transform(date, 'dd-MM-yyyy');
    return formattedDate;
  }


  addToCart(){
    let user_id : number;
    if (this.authenticationService.currentUserValue) {
      user_id = this.authenticationService.currentUserValue.userId;
    } else {
      user_id = -1;
    }
    if (user_id != -1) {
      this.cartService.addItemToCart(user_id, this.id, 1)
      .pipe()
      .subscribe(
        data => {
          this.cartService.getUserCart(user_id)
          .pipe()
          .subscribe(
            data => {
              this.countItems(data);
            },
            error => console.log(error)
          );
        },
        error => console.log(error)
      );
    } 
    else {
      this.cartService.addItemToLocalCart(this.id, 1)
      .then(
        data => {
          this.cartService.getUserLocalCart()
          .then(
            (data : CartItem[]) => {
              this.countItems(data);
            }
          );
        },
        error => console.log(error)
      );
    }
  }

  close() {
    this.infobulecontainer.clear();
  }

  countItems(data : CartItem[]) {
    let numberOfItems = 0;
    for (let item of data) {
      numberOfItems += item.movieUserCartCount;
    }
    this.numberofitemsincartService.ChangeNumberOfItemsInCartMessage(numberOfItems);
  }

}