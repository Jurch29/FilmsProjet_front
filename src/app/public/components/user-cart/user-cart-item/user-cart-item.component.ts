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
        this.movieTitle = movie.movie_title;
        this.unitCost = movie.movie_price;
        this.totalCost = this.unitCost * this.numberOfItems;
        this.moviePreviewImage["background-image"] = "url(" + movie.movie_image_path + ")";
      },
      error => {
        console.log(error);
      }
    );
  }
}
