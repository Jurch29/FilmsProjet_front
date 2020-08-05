import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { User } from 'src/app/shared/models/user';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { CartService } from 'src/app/core/service/cart.service';
import { NumberOfItemsInCartService } from 'src/app/core/service/number-of-items-in-cart.service';
import { CartItem } from 'src/app/shared/models/cart-item';
import { LightmodeService } from 'src/app/core/service/lightmode.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit,OnDestroy {
  cart : CartItem[];
  items : boolean = false;
  currentUser : User;
  totalCost : number;
  subscriptionlightMode: any;
  lightMode: boolean;
  
  constructor(private lightmodeService: LightmodeService,private navbar : NavbarComponent, private authenticationService : AuthenticationService,
              private cartService : CartService, private numberofitemsincartService : NumberOfItemsInCartService) {}

  ngOnInit() {
    this.cart = undefined;
    this.currentUser = this.authenticationService.currentUserValue;
    this.items = false;
    this.authenticationService.currentUser
    .pipe()
    .subscribe(
      user => {
        if (user != undefined) {
          this.cartService.mergeCarts(user.userId)
          .then(
            response => {
              this.cartService.getUserCart(user.userId)
              .subscribe(
                data => {
                  this.listCartItems(data);
                }
              );
            });
        }
        else {
          this.cartService.getUserLocalCart()
          .then(
            (data : CartItem[]) => {
              this.listCartItems(data);
            }
          );
        }
    });
    this.subscriptionlightMode =  this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    ); 
  }
  ngOnDestroy(){
    this.subscriptionlightMode.unsubscribe();
  }

  buy() {
    this.cartService.buyCart(this.authenticationService.currentUserValue.userId)
    .pipe()
    .subscribe(
      data => {
        this.items = false;
        this.numberofitemsincartService.ChangeNumberOfItemsInCartMessage(0);
        this.cart = undefined;
      },
      error => {
        console.log(error);
      }
    );
  }

  login() {
    this.navbar.openLoginDialog();
  }

  get getUser() : boolean {
    if (this.authenticationService.currentUserValue) {
      return true;
    } else {
      return false;
    }
  }

  addToTotalCost(cost : number) {
    this.totalCost += cost;
  }

  removeToTotalCost(cost : number) {
    this.totalCost -= cost;
  }

  emptyCart() {
    let user_id : number;
    if (this.authenticationService.currentUserValue) {
      user_id = this.authenticationService.currentUserValue.userId;
    } else {
      user_id = -1;
    }
    if (user_id != -1) {
      this.cartService.clearCart(user_id)
      .subscribe(
        data => {
          this.ngOnInit();
        }
      );
    } else {
      this.cartService.clearLocalCart()
      .then(
        data => {
          this.ngOnInit();
        }
      );
    }
  }

  listCartItems(data : CartItem[]) {
    let numberOfItems = 0;
    this.totalCost = 0;
    this.items = false;
    for (let item of data) {
      this.items = true;
      numberOfItems += item.movieUserCartCount;
    }
    this.numberofitemsincartService.ChangeNumberOfItemsInCartMessage(numberOfItems);
    this.cart = data;
  }
  
}
