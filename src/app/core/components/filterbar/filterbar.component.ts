import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../../service/movie-service.service';
import { first } from 'rxjs/operators';
import { Author } from 'src/app/shared/models/author';
import { Category } from 'src/app/shared/models/category';
import { Actor } from 'src/app/shared/models/actor';
import { LightmodeService } from '../../service/lightmode.service';

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.css']
})

export class FilterbarComponent implements OnInit,OnDestroy {
  categorys  =new Array<Category>();
  actors  =new Array<Actor>();
  authors =new Array<Author>();
  subscriptionlightMode: any;
  lightMode: boolean;
  constructor(private lightmodeService:LightmodeService,private movieService : MovieService) { }

  ngOnInit() {
    this.movieService.getAllAuthors().pipe(first()).subscribe(data => this.authors = data);
    this.movieService.getAllCategorys().pipe(first()).subscribe(data => this.categorys = data);
    this.movieService.getAllActors().pipe(first()).subscribe(data => this.actors = data);
    this.subscriptionlightMode =  this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
   
  }
  ngOnDestroy(): void {
    this.subscriptionlightMode.unsubscribe();
  }
  onOrderByChange(event){
      console.log("event = "+event.value);//If undefined means choose no selection
  }
  onAuthorChange(event){
      console.log("event = "+event.value);//If undefined means choose no selection
  }
  onCategoryChange(event){
      console.log("event = "+event.value);//If undefined means choose no selection
  }
  onActorChange(event){
     console.log("event = "+event.value);//If undefined means choose no selection
  }
}
