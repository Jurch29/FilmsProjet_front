import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie-service.service';

@Component({
  selector: 'app-user-cart-item',
  templateUrl: './user-cart-item.component.html',
  styleUrls: ['./user-cart-item.component.css']
})
export class UserCartItemComponent implements OnInit {
  movieTitle : string;
  numberOfItems : number;
  unitCost : number;
  totalCost : number ;
  moviePreviewImage = {
    "background-image": ""
  } 
  constructor(private movieService : MovieService) { }

  ngOnInit() {
    
  }

  setProperties(movie_id : number, count : number) {
    this.numberOfItems = count;
    this.movieService.getMovieById(movie_id)
    .pipe()
    .subscribe(
      movie => {
        this.movieTitle = movie.movieTitle;
        this.unitCost = movie.moviePrice;
        this.totalCost = this.unitCost * this.numberOfItems;
        this.moviePreviewImage["background-image"] = "url(" + movie.movieImagePath + ")";
      },
      error => {
        console.log(error);
      }
    );
  }
}
