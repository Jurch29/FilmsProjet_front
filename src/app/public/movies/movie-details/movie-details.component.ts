import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { first, take } from 'rxjs/operators';
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
import { ThrowStmt } from '@angular/compiler';
import { StarRatingComponent } from 'ng-starrating';
import { HttpClient } from '@angular/common/http';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

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
  private realisators: Author[];
  private actors: Actor[];
  private categories: Category[];
  private synopsis: string;
  private trailers: Trailer[];
  subscriptionlightMode: any;
  srcResult:any = null;
  movie: any;
  safeContent: any;
  ratingValueUsers: number;
  readonly: boolean;
  ratingValueCritique: number;
  DidBuy: boolean;
  ratingValueCurrentUser: number;
  Comments: any[] = [
    {
      Username: "uyedfteytdfedyeftrye",
      UserComment: "eby tfdetdfc",
      ImageComment: []
    },
    {
      Username: "pierre",
      UserComment: "c",
      ImageComment: [
        {
          url:
            "https://www.voyage.fr/sites/default/files/styles/1170x530/public/2018-04/00-les-paysages-russes-a-voir-absolument.jpg?itok=V_lDD5Ip"
        },
        {
          url:
            "https://www.voyage.fr/sites/default/files/styles/1170x530/public/2018-04/00-les-paysages-russes-a-voir-absolument.jpg?itok=V_lDD5Ip"
        },
        {
          url:
            "https://www.voyage.fr/sites/default/files/styles/1170x530/public/2018-04/00-les-paysages-russes-a-voir-absolument.jpg?itok=V_lDD5Ip"
        },
        {
          url:
            "https://www.voyage.fr/sites/default/files/styles/1170x530/public/2018-04/00-les-paysages-russes-a-voir-absolument.jpg?itok=V_lDD5Ip"
        },
        {
          url:
            "https://www.voyage.fr/sites/default/files/styles/1170x530/public/2018-04/00-les-paysages-russes-a-voir-absolument.jpg?itok=V_lDD5Ip"
        },
        {
          url:
            "https://www.voyage.fr/sites/default/files/styles/1170x530/public/2018-04/00-les-paysages-russes-a-voir-absolument.jpg?itok=V_lDD5Ip"
        }
      ]
    }
  ];

  constructor(private _ngZone: NgZone, private httpClient: HttpClient,private lightmodeService: LightmodeService, private authenticationService: AuthenticationService, private cartService: CartService, private numberofitemsincartService: NumberOfItemsInCartService, private sanitizer: DomSanitizer, private movieService: MovieService, private route: ActivatedRoute) { }
 
  @ViewChild("autosize",{static:false}) autosize: CdkTextareaAutosize;

  ngOnInit() {
    this.route.params.pipe(first()).subscribe(data => this.id = data.movieID)

    this.movieService.getMovieById(this.id).pipe(first()).subscribe(data => {
      this.movie = data;
      this.setupMoviedetails();
    });
    this.subscriptionlightMode =  this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
  }
  ngOnDestroy(){
    this.subscriptionlightMode.unsubscribe();
  }
  setupMoviedetails(){
    this.ratingValueCritique = this.movie.movieMark;
    this.date = this.formatDate(this.movie.movieDate);
    this.duration = this.movie.movieDuration;
    this.title = this.movie.movieTitle;
    this.actors = this.movie.actors;
    this.realisators = this.movie.authors;
    this.categories = this.movie.categories;
    this.trailer = this.movie.movieTrailerPath;
    this.readonly = true;
    this.DidBuy = true;
    //this.ratingValueUsers   not set for now but to do
     //this.ratingValueCurrentUser = 2;   not set for now but to do
    this.safeContent =  this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.movieTrailerPath);
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

  addToCart(){
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
  
  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    this.ratingValueCurrentUser=$event.newValue;
  }

  trailer(trailer : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(trailer);
  }
  triggerResize() {
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onFileSelected() {
    const inputNode: any = document.querySelector("#file");
    if (typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
