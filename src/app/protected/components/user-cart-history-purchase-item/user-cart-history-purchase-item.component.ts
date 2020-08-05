import { Component, OnInit, Input } from '@angular/core';
import { OrderItem } from 'src/app/shared/models/order-item';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { UserCartHistoryPurchaseComponent } from '../user-cart-history-purchase/user-cart-history-purchase.component';

@Component({
  selector: 'app-user-cart-history-purchase-item',
  templateUrl: './user-cart-history-purchase-item.component.html',
  styleUrls: ['./user-cart-history-purchase-item.component.css']
})
export class UserCartHistoryPurchaseItemComponent {
  public title : String;
  public count : number;
  public unitCost : number;
  public totalCost : number;
  @Input()
  item : OrderItem;
  @Input()
  order : UserCartHistoryPurchaseComponent;

  constructor(private movieService : MovieService) {}

  ngOnInit() {
    this.count = this.item.count;
    this.movieService.getMovieById(this.item.movie_id)
    .pipe()
    .subscribe(
      data => {
        this.title = data.movieTitle;
        this.unitCost = data.moviePrice;
        this.totalCost = this.count * this.unitCost;
        this.order.addToTotalCost(this.totalCost);
      }
    );
  }
}