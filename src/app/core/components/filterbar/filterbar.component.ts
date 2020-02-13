import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../../service/movie-service.service';
import { first, startWith, map } from 'rxjs/operators';
import { Author } from 'src/app/shared/models/author';
import { Category } from 'src/app/shared/models/category';
import { Actor } from 'src/app/shared/models/actor';
import { LightmodeService } from '../../service/lightmode.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.css']
})

export class FilterbarComponent implements OnInit, OnDestroy {
  categorys = new Array<Category>();
  actors = new Array<Actor>();
  authors = new Array<Author>();
  subscriptionlightMode: any;
  lightMode: boolean;
  filteredOptionsActor: Observable<Actor[]>;
  filterActor = new FormControl();
  filteredOptionsAuthor: Observable<Author[]>;
  filterAuthor = new FormControl();


  constructor(private lightmodeService: LightmodeService, private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getAllCategorys().pipe(first()).subscribe(data => this.categorys = data);
    this.movieService.getAllAuthors().pipe(first()).subscribe(data => {
      this.authors = data
      this.filteredOptionsAuthor = this.filterAuthor.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value),
          map(inputedValue => this._filterAuthor(inputedValue))
        );
    });
    this.movieService.getAllActors().pipe(first()).subscribe(data => {
      this.actors = data
      this.filteredOptionsActor = this.filterActor.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value),
          map(inputedValue => this._filterActor(inputedValue))
        );
    });
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
  }
  displayAuthor(author: Author): string {
    return author ? author.authorLastName+' '+ author.authorFirstName : '';
  }
  displayActor(actor: Actor): string {
    return actor ? actor.actorLastName+' '+actor.actorFirstName : '';
  }

  _filterActor(inputedValue: string): Actor[] {
    if (inputedValue != null) {
      const filterValue = inputedValue.toLowerCase();
      return this.actors.filter(item => {
        let value = `${item.actorFirstName} ${item.actorLastName}`
        if (value.toLowerCase().indexOf(filterValue) != -1) {
          return item;
        }
      });
    }
  }
  _filterAuthor(inputedValue: string): Author[] {
    if (inputedValue != null) {
      const filterValue = inputedValue.toLowerCase();
      return this.authors.filter(item => {
        let value = `${item.authorFirstName} ${item.authorLastName}`
        if (value.toLowerCase().indexOf(filterValue) != -1) {
          return item;
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.subscriptionlightMode.unsubscribe();
  }
  onOrderByChange(event) {
    console.log("event = " + event.value);//If undefined means choose no selection
  }
  onCategoryChange(event) {
    console.log("event = " + event.value);//If undefined means choose no selection
  }
  onAuthorChange(event) {
    console.log("event = " + event.option.value.author_id);//If undefined means choose no selection
  }
  onActorChange(event) {
    console.log("event = " + event.option.value.actor_id);//If undefined means choose no selection
  }

}
