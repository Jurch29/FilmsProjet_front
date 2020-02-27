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
  movies: Movie[];


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
    return author ? author.authorFirstName + ' ' + author.authorLastName : '';
  }

  displayActor(actor: Actor): string {
    return actor ? actor.actorFirstName + ' ' + actor.actorLastName : '';
  }

  _filterActor(inputedValue: string): Actor[] {
    if (inputedValue != null) {
      const filterValue = inputedValue.toString().toLowerCase();
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
      const filterValue = inputedValue.toString().toLowerCase();
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
    this.movies = this.movieService.getMoviesToDisplay;
    if (event.value == undefined) {
      this.movies.sort(function (a, b) {
        return <any>b.movieDate - <any>a.movieDate;
      });
    } else {
      this.movies.sort(function (a, b) {
        var textA = a.movieTitle.toUpperCase();
        var textB = b.movieTitle.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }
    this.movieService.ChangeMoviesToDisplay(this.movies)

  }

  onCategoryChange(event) {
    this.movies = this.movieService.getMoviesToDisplay;
    if (event.value == undefined) {
      this.movieService.getAllMovies().pipe().subscribe(data => {
        this.movieService.ChangeMoviesToDisplay(data);
      });
    } else {
      const cathegory = event.value.toLowerCase();
      this.movies = this.movies.filter(item => {
        if (item.categories.find(element => element.categoryTitle.toLowerCase() === cathegory) != undefined) {
          return item;
        }
        return null;
      });
    }
    if (this.movies != null) {
      this.movieService.ChangeMoviesToDisplay(this.movies);
    } else {
      this.movieService.getAllMovies().pipe().subscribe(data => {
        this.movieService.ChangeMoviesToDisplay(data);
      });
    }

  }

  onAuthorChange(event) {
    this.movies = this.movieService.getMoviesToDisplay;
    if (event.option.value == undefined) {
      this.movieService.getAllMovies().pipe().subscribe(data => {
        this.movieService.ChangeMoviesToDisplay(data);
      });
    } else {
      const frist = event.option.value.authorFirstName.toLowerCase();
      const last = event.option.value.authorLastName.toLowerCase();
      this.movies = this.movies.filter(item => {
        if (item.authors.find(element => element.authorFirstName.toLowerCase() === frist
          &&
          element.authorLastName.toLowerCase() === last) != undefined) {
          return item;
        }
        return null;
      });
    }
    if (this.movies != null) {
      this.movieService.ChangeMoviesToDisplay(this.movies);
    } else {
      this.movieService.getAllMovies().pipe().subscribe(data => {
        this.movieService.ChangeMoviesToDisplay(data);
      });
    }
  }
  
  onActorChange(event) {
    this.movies = this.movieService.getMoviesToDisplay;
    if (event.option.value == undefined) {
      this.movieService.getAllMovies().pipe().subscribe(data => {
        this.movieService.ChangeMoviesToDisplay(data);
      });
    } else {
      const frist = event.option.value.actorFirstName.toLowerCase();
      const last = event.option.value.actorLastName.toLowerCase();
      this.movies = this.movies.filter(item => {
        if (item.actors.find(element => element.actorFirstName.toLowerCase() === frist
          &&
          element.actorLastName.toLowerCase() === last) != undefined) {
          return item;
        }
        return null;
      });
    }
    if (this.movies != null) {
      this.movieService.ChangeMoviesToDisplay(this.movies);
    } else {
      this.movieService.getAllMovies().pipe().subscribe(data => {
        this.movieService.ChangeMoviesToDisplay(data);
      });
    }
  }
}
