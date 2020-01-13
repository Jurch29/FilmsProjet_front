import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
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
