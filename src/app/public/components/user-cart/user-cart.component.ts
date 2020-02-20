import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { User } from 'src/app/shared/models/user';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { CartService } from 'src/app/core/service/cart.service';
import { NumberOfItemsInCartService } from 'src/app/core/service/number-of-items-in-cart.service';
import { CartItem } from 'src/app/shared/models/cart-item';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent {
  private cart : CartItem[];
  items : boolean = false;
  currentUser : User;
  private totalCost : number;
  
  constructor(private navbar : NavbarComponent, private authenticationService : AuthenticationService,
              private cartService : CartService, private numberofitemsincartService : NumberOfItemsInCartService) {}

  buy(){
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

  ngOnInit() {
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
  }

  login(){
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
