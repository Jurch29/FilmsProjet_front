import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-cart-history',
  templateUrl: './user-cart-history.component.html',
  styleUrls: ['./user-cart-history.component.css']
})
export class UserCartHistoryComponent implements OnInit {
  movieTitle: string = "Avengers";
  BuyDate : string ="08/12/2019";
  NumberOfItems : number = 3;
  TotalCost : string ="10.50€";
  MoviePreviewImage = {
    "background-image": ""
  } 
  constructor() { }

  ngOnInit() {
    this.MoviePreviewImage["background-image"] = "url(http://image.tmdb.org/t/p/w500/fF7vPzCF6kIsLuWEHCGPGl2xTw1.jpg)";

  }

}
