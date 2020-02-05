import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { UserCartItemComponent } from './user-cart-item/user-cart-item.component';
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
export class UserCartComponent implements OnInit {
  @ViewChild("itemcontainer", { static : false,read: ViewContainerRef }) container;
  
  items : boolean = false;
  private componentRef : ComponentRef<any>;
  private componentFactory : ComponentFactory<any>;
  currentUser : User;
  private componentList : any[];
  
  constructor(private navbar : NavbarComponent, private authenticationService : AuthenticationService, private cartService : CartService, private numberofitemsincartService : NumberOfItemsInCartService, private resolver : ComponentFactoryResolver) { 
    this.componentFactory = this.resolver.resolveComponentFactory(UserCartItemComponent);
  }

  buy(){
    this.cartService.buyCart(this.authenticationService.currentUserValue.id)
    .pipe()
    .subscribe(
      data => {
        this.items = false;
        for (let component of this.componentList) {
          component.destroy();
        }
        this.numberofitemsincartService.ChangeNumberOfItemsInCartMessage(0);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.items = false;
    this.authenticationService.currentUser.subscribe(data => {
      if (data != undefined) {
        this.cartService.getUserCart(data.id)
        .pipe()
        .subscribe(
          data => {
            let numberOfItems = 0;
            for (let item of data) {
              numberOfItems += item.movie_user_cart_count;
            }
            this.numberofitemsincartService.ChangeNumberOfItemsInCartMessage(numberOfItems);
            let i = 0;
            this.componentList = new Array();
            for (let element of data) {
              this.items = true;
              this.componentRef = this.container.createComponent(this.componentFactory, 0);
              this.componentList[i++] = this.componentRef;
              this.componentRef.instance.setProperties(element.movie_id, element.movie_user_cart_count);
            }
          },
          error => {
            console.log(error);
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
      this.items = false;
      return false;
    }
  }
}
