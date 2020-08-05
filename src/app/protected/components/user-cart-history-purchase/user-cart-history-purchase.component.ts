import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { OrderItem } from 'src/app/shared/models/order-item';

@Component({
  selector: 'app-user-cart-history-purchase',
  templateUrl: './user-cart-history-purchase.component.html',
  styleUrls: ['./user-cart-history-purchase.component.css']
})
export class UserCartHistoryPurchaseComponent {
  public items : OrderItem[];
  public purchase_date : String;
  public totalCost : number;
  @Input()
  order : Order;

  constructor() {}

  ngOnInit() {
    this.purchase_date = this.order.purchase_date;
    this.items = this.order.items;
    this.totalCost = 0;
  }

  //Les dates mongo sont des strings direct ==> méthode probablement inutile
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
    let hour = ("0" + date.getHours()).slice(-2);
    let minute = ("0" + date.getMinutes()).slice(-2);
    let seconde = ("0" + date.getSeconds()).slice(-2);
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year + " à " + hour + ':' + minute + ':' + seconde;
  }

  addToTotalCost(cost : number) {
    this.totalCost += cost;
  }
}
