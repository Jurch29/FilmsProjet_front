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
import { DatePipe } from '@angular/common';
import { Movie } from 'src/app/shared/models/movie';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
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
  srcResult: any = null;
  movie: Movie;
  safeContent: any;
  ratingValueUsers: number;
  readonly: boolean;
  ratingValueCritique: number;
  DidBuy: boolean;
  user : User;
  ratingValueCurrentUser: number;
  Comments: any[] = [
    {
      Username: "uyedfteytdfedyeftrye",
      UserComment: "eby tfdetdfc",
      ImageComment: []
    },
    {
      Username: "julien",
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
  constructor(private _ngZone: NgZone, private httpClient: HttpClient, private lightmodeService: LightmodeService, private authenticationService: AuthenticationService,
    private cartService: CartService, private numberofitemsincartService: NumberOfItemsInCartService,
    private sanitizer: DomSanitizer, private movieService: MovieService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  @ViewChild("autosize", { static: false }) autosize: CdkTextareaAutosize;

  ngOnInit() {
    this.route.params.pipe(first()).subscribe(data => this.id = data.movieID)

    this.movieService.getMovieById(this.id).pipe(first()).subscribe(data => {
      this.movie = data;
      this.setupMoviedetails();
    });
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
    this.user =this.authenticationService.currentUserValue;
    console.log(this.user)
  }

  ngOnDestroy() {
    this.subscriptionlightMode.unsubscribe();
  }

  setupMoviedetails() {
    this.ratingValueCritique = this.movie.movieMark;
    this.date = this.formatDate(this.movie.movieDate);
    this.duration = this.movie.movieDuration;
    this.title = this.movie.movieTitle;
    this.actors = this.movie.actors;
    this.realisators = this.movie.authors;
    this.categories = this.movie.categories;
    this.readonly = true;
    this.DidBuy = true;
    this.safeContent = this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.movieTrailerPath);
    this.movieService.getSynopsis(this.movie.movieId).pipe(first()).subscribe(data => {
       this.synopsis = data.movieDescription
    }, error =>{
      console.log(error);
    });
  }

  formatDate(srtdate: Date) {
    var re = /0000/gi; 
    let date = new Date(srtdate.toString().replace(re, "00:00"));
    let formattedDate =this.datepipe.transform(date, 'dd-MM-yyyy');
    return formattedDate;
  }

  addToCart() {
    this.cartService.addItemToCart(this.authenticationService.currentUserValue.userId, this.id, 1)
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

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.ratingValueCurrentUser = $event.newValue;
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
