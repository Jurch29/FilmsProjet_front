import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie-service.service';
import { first } from 'rxjs/operators';
import { Author } from 'src/app/shared/models/author';
import { Category } from 'src/app/shared/models/category';
import { Actor } from 'src/app/shared/models/actor';

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.css']
})

export class FilterbarComponent implements OnInit {
  categorys  =new Array<Category>();
  actors  =new Array<Actor>();
  authors =new Array<Author>();
  constructor(private movieService : MovieService) { }

  ngOnInit() {
    this.movieService.getAllAuthors().pipe(first()).subscribe(data => this.authors = data);
    this.movieService.getAllCategorys().pipe(first()).subscribe(data => this.categorys = data);
    this.movieService.getAllActors().pipe(first()).subscribe(data => this.actors = data);

  }
  onAuthorChange(event){
    if(event.value != undefined)
      console.log("event = "+event.value);
  }
  onCategoryChange(event){
    if(event.value != undefined)
      console.log("event = "+event.value);
  }
  onActorChange(event){
    if(event.value != undefined)
     console.log("event = "+event.value);
  }
}
