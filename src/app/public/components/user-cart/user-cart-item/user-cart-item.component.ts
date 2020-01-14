import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-cart-item',
  templateUrl: './user-cart-item.component.html',
  styleUrls: ['./user-cart-item.component.css']
})
export class UserCartItemComponent implements OnInit {
  movieTitle: string;
  BuyDate : string;
  NumberOfItems : number;
  TotalCost : string ;
  url: string;
  MoviePreviewImage = {
    "background-image": ""
  } 
  constructor() { }

  ngOnInit() {
    this.MoviePreviewImage["background-image"] = "url("+this.url+")";
  }

}
