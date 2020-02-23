import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { UserCartComponent } from '../user-cart.component';
import { CartItem } from 'src/app/shared/models/cart-item';
import { CartService } from 'src/app/core/service/cart.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { NumberOfItemsInCartService } from 'src/app/core/service/number-of-items-in-cart.service';

@Component({
  selector: 'app-user-cart-item',
  templateUrl: './user-cart-item.component.html',
  styleUrls: ['./user-cart-item.component.css']
})
export class UserCartItemComponent {
  movieId : number;
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

  constructor(private movieService : MovieService, private cartService : CartService, private authenticationService : AuthenticationService, private numberOfItemService : NumberOfItemsInCartService) {}

  ngOnInit() {
    this.numberOfItems = this.cartItem.movieUserCartCount;
    this.movieService.getMovieById(this.cartItem.embeddedKeyMovieUser.movieId)
    .pipe()
    .subscribe(
      movie => {
        this.movieId = movie.movieId;
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

  addItem() {
    let user_id : number;
    if (this.authenticationService.currentUserValue) {
      user_id = this.authenticationService.currentUserValue.userId;
    } else {
      user_id = -1;
    }
    if (user_id != -1) {
      this.cartService.addItemToCart(user_id, this.movieId)
      .subscribe(
        data => {
          this.addItemUpdate();
        }
      );
    } else {
      this.cartService.addItemToLocalCart(this.movieId)
      .then(
        data => {
          this.addItemUpdate();
        }
      );
    }
  }

  addItemUpdate() {
    if (this.authenticationService.currentUserValue == undefined) {
      this.cartItem.movieUserCartCount += 1;
    }
    this.numberOfItems = this.cartItem.movieUserCartCount;
    this.totalCost = this.numberOfItems * this.unitCost;
    this.cart.addToTotalCost(this.unitCost);
    this.numberOfItemService.ChangeNumberOfItemsInCartMessage(this.numberOfItemService.getNumberOfItemsInCart + 1);
  }

  removeItem() {
    let user_id : number;
    if (this.authenticationService.currentUserValue) {
      user_id = this.authenticationService.currentUserValue.userId;
    } else {
      user_id = -1;
    }
    if (user_id != -1) {
      this.cartService.removeItemToCart(user_id, this.movieId)
      .subscribe(
        data => {
          this.removeItemUpdate();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.cartService.removeItemToLocalCart(this.movieId)
      .then(
        data => {
          this.removeItemUpdate();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  removeItemUpdate() {
    if (this.numberOfItems != 1) {
      if (this.authenticationService.currentUserValue == undefined) {
        this.cartItem.movieUserCartCount -= 1;
      }
      this.numberOfItems = this.cartItem.movieUserCartCount;
      this.totalCost = this.numberOfItems * this.unitCost;
      this.cart.removeToTotalCost(this.unitCost);
      this.numberOfItemService.ChangeNumberOfItemsInCartMessage(this.numberOfItemService.getNumberOfItemsInCart - 1);
    } else {
      this.cart.removeToTotalCost(this.unitCost);
      this.numberOfItemService.ChangeNumberOfItemsInCartMessage(this.numberOfItemService.getNumberOfItemsInCart - 1);
      this.cart.ngOnInit();
    }
  }
}
