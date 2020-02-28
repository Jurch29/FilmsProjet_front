import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/service/order.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-user-cart-history',
  templateUrl: './user-cart-history.component.html',
  styleUrls: ['./user-cart-history.component.css']
})
export class UserCartHistoryComponent {
  private orders : Order[];

  constructor(private authenticationService : AuthenticationService, private orderService : OrderService) {}

  ngOnInit() {
    this.orderService.getUserOrders(this.authenticationService.currentUserValue.userId)
    .pipe()
    .subscribe(
      data => {
        console.log(data);
        this.orders = data
      },
      error =>  {
        console.log(error);
      }
    );
  }
}
