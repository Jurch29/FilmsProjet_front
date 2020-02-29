import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../../service/movie-service.service';
import { first, startWith, map } from 'rxjs/operators';
import { Author } from 'src/app/shared/models/author';
import { Category } from 'src/app/shared/models/category';
import { Actor } from 'src/app/shared/models/actor';
import { LightmodeService } from '../../service/lightmode.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Movie } from 'src/app/shared/models/movie';

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
  MoviesToDisplay: Movie[];
  allMovies: Movie[];
  FilterAuthorA: Movie[];
  FilterActorB: Movie[];
  FilterNameC: Movie[];
  FilterCategoryD: Movie[];
  OrderByChoice: any;

  constructor(private lightmodeService: LightmodeService, private movieService: MovieService) { }

  ngOnInit() {

    this.movieService.getAllMovies().then(data => {
      this.FilterAuthorA = data;
      this.FilterActorB = data;
      this.FilterNameC = data;
      this.FilterCategoryD = data;
      this.MoviesToDisplay = data;
    });
    this.movieService.getAllCategorys().pipe(first()).subscribe(data => {
      this.categorys = data;
    });
    this.movieService.getAllAuthors().pipe(first()).subscribe(data => {
      this.authors = data
      this.filteredOptionsAuthor = this.filterAuthor.valueChanges
        .pipe(
          startWith(''),
          map(value =>  value),
          map(inputedValue => this._AutocompleteSaisieAuthor(inputedValue))
        );
    });
    this.movieService.getAllActors().pipe(first()).subscribe(data => {
      this.actors = data
      this.filteredOptionsActor = this.filterActor.valueChanges
        .pipe(
          startWith(''),
          map(value =>  value),
          map(inputedValue => this._AutocompleteSaisieActor(inputedValue))
        );
    });
    this.subscriptionlightMode = this.lightmodeService.getLightModeEventMessage().subscribe(value =>
      this.lightMode = value
    );
    this.movieService.getValueTitleSearch().subscribe(value => {
      if(value.length>0){
        this.FilterNameC = value;
        this.compileFilters();
        this.onOrderByChange(this.OrderByChoice);
      }
    });
  }

  displayAuthor(author: Author): string {
    return author ? author.authorFirstName + ' ' + author.authorLastName : '';
  }

  displayActor(actor: Actor): string {
    return actor ? actor.actorFirstName + ' ' + actor.actorLastName : '';
  }

  _AutocompleteSaisieActor(inputedValue: string): Actor[] {
    if (inputedValue != null) {
      const filterValue = inputedValue.toString().toLowerCase();
      return this.actors.filter(item => {
        let value = `${item.actorFirstName} ${item.actorLastName}`
        if (value.toLowerCase().indexOf(filterValue) != -1) {
          return item;
        }
      });
    }else{
      return this.actors;
    }
  }

  _AutocompleteSaisieAuthor(inputedValue: string): Author[] {
    if (inputedValue != null) {
      const filterValue = inputedValue.toString().toLowerCase();
      return this.authors.filter(item => {
        let value = `${item.authorFirstName} ${item.authorLastName}`
        if (value.toLowerCase().indexOf(filterValue) != -1) {
          return item;
        }
      });
    }else{
      return this.authors;
    }
  }

  ngOnDestroy(): void {
    this.subscriptionlightMode.unsubscribe();
  }

  onOrderByChange(event) {
    if (event == undefined || event.value == undefined) {
      this.OrderByChoice = undefined;
      this.MoviesToDisplay.sort(function (a, b) {
        return <any>b.movieDate - <any>a.movieDate;
      });
    } else {
      this.OrderByChoice = event;
      this.MoviesToDisplay.sort(function (a, b) {
        var textA = a.movieTitle.toUpperCase();
        var textB = b.movieTitle.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }
    this.movieService.ChangeMoviesToDisplay(this.MoviesToDisplay)
  }
  compileFilters() {
    this.MoviesToDisplay = this.allMovies.filter(x => this.FilterAuthorA.includes(x));
    this.MoviesToDisplay = this.MoviesToDisplay.filter(x => this.FilterActorB.includes(x));
    this.MoviesToDisplay = this.MoviesToDisplay.filter(x => this.FilterNameC.includes(x));
    this.MoviesToDisplay = this.MoviesToDisplay.filter(x => this.FilterCategoryD.includes(x));
  }
  onCategoryChange(event) {
    this.movieService.getAllMovies().then(data => {
      this.allMovies = data;
      if (event.value == undefined) {
        this.FilterCategoryD = this.allMovies;
      } else {
        const cathegory = event.value.toLowerCase();
        this.FilterCategoryD = this.allMovies.filter(item => {
          if (item.categories.find(element => element.categoryTitle.toLowerCase() === cathegory) != undefined) {
            return item;
          }
          return null;
        });
      }
      if (this.FilterCategoryD == null) {
        this.FilterCategoryD = this.allMovies;
      }
      this.compileFilters();
      this.onOrderByChange(this.OrderByChoice);
    });
  }

  onAuthorChange(event) {
    this.movieService.getAllMovies().then(data => {
      this.allMovies = data;
      if (event.option.value == undefined) {
        this.FilterAuthorA = this.allMovies;
      } else {
        const frist = event.option.value.authorFirstName.toLowerCase();
        const last = event.option.value.authorLastName.toLowerCase();
        this.FilterAuthorA = this.allMovies.filter(item => {
          if (item.authors.find(element => element.authorFirstName.toLowerCase() === frist
            &&
            element.authorLastName.toLowerCase() === last) != undefined) {
            return item;
          }
          return null;
        });
      }
      if (this.FilterAuthorA == null) {
        this.FilterAuthorA = this.allMovies;
      }
      this.compileFilters();
      this.onOrderByChange(this.OrderByChoice);
    });
  }

  onActorChange(event) {
    this.movieService.getAllMovies().then(data => {
      this.allMovies = data;
      if (event.option.value == undefined) {
        this.FilterActorB = this.allMovies;
      } else {
        const frist = event.option.value.actorFirstName.toLowerCase();
        const last = event.option.value.actorLastName.toLowerCase();
        this.FilterActorB = this.allMovies.filter(item => {
          if (item.actors.find(element => element.actorFirstName.toLowerCase() === frist
            &&
            element.actorLastName.toLowerCase() === last) != undefined) {
            return item;
          }
          return null;
        });
      }
      if (this.FilterActorB == null) {
        this.FilterActorB = this.allMovies;
      }
      this.compileFilters();
      this.onOrderByChange(this.OrderByChoice);
    });
  }
}
