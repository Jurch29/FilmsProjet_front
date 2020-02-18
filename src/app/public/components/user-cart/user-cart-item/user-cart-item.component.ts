import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { UserCartComponent } from '../user-cart.component';
import { CartItem } from 'src/app/shared/models/cart-item';

@Component({
  selector: 'app-user-cart-item',
  templateUrl: './user-cart-item.component.html',
  styleUrls: ['./user-cart-item.component.css']
})
export class UserCartItemComponent implements OnInit {
  movieTitle : string;
  numberOfItems : number;
  unitCost : number;
  totalCost : number ;
  moviePreviewImage = {
    "background-image": ""
  }
  @Input()
  cartItem : CartItem;
  @Input()
  cart : UserCartComponent;

  constructor(private movieService : MovieService) {}

  ngOnInit() {
    this.numberOfItems = this.cartItem.movieUserCartCount;
    this.movieService.getMovieById(this.cartItem.embeddedKeyMovieUser.movieId)
    .pipe()
    .subscribe(
      movie => {
        this.movieTitle = movie.movieTitle;
        this.unitCost = movie.moviePrice;
        this.totalCost = this.unitCost * this.numberOfItems;
        this.moviePreviewImage["background-image"] = "url(" + movie.movieImagePath + ")";
        this.cart.addToTotalCost(this.totalCost);
      },
      error => {
        console.log(error);
      }
    );
  }
}
