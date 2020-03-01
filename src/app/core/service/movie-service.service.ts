import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/app/shared/models/movie';
import { Actor } from 'src/app/shared/models/actor';
import { Author } from 'src/app/shared/models/author';
import { Category } from 'src/app/shared/models/category';
import { Trailer } from 'src/app/shared/models/trailer';
import { Synopsis } from 'src/app/shared/models/synopsis';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  private MoviesDisplay = new BehaviorSubject<Movie[]>(new Array());
  private AllMovies = new BehaviorSubject<Movie[]>(new Array());
  private searchTitle = new BehaviorSubject<Movie[]>(new Array());

  changeTitleSearch(message: Movie[]) {
    this.searchTitle.next(message);
  }

  getValueTitleSearch(): Observable<Movie[]>{
    return this.searchTitle.asObservable(); 
  }

  ChangeMoviesToDisplay(MoviesToDisplay: Movie[]) {
    this.MoviesDisplay.next(MoviesToDisplay);
  }

  get getMoviesToDisplay(): Movie[] {
    return this.MoviesDisplay.value;
  }

  async getAllMovies() {
    if (this.AllMovies.value.length <= 0) {
      const t =await this.http.get<Movie[]>(`${environment.apiUrl}/movie/movies`).toPromise();
      this.AllMovies.next(t);
    }
      return this.AllMovies.value;
  }

  getMovieById(id: number) {
    return this.http.get<Movie>(`${environment.apiUrl}/movie/movie/${id}`);
  }

  getActorByMovieId(id: number) {
    return this.http.get<Actor[]>(`${environment.apiUrl}/actors/${id}`);
  }

  getAllActors() {
    return this.http.get<Actor[]>(`${environment.apiUrl}/movie/actors`);
  }

  getAuthorsByMovieId(id: number) {
    return this.http.get<Author[]>(`${environment.apiUrl}/author/${id}`);
  }

  getAllAuthors() {
    return this.http.get<Author[]>(`${environment.apiUrl}/movie/authors`);
  }

  getCategorysByMovieId(id: number) {
    return this.http.get<Category[]>(`${environment.apiUrl}/category/${id}`);
  }

  getAllCategorys() {
    return this.http.get<Category[]>(`${environment.apiUrl}/movie/categories`);
  }

  getTrailersByMovieId(id: number) {
    return this.http.get<Trailer[]>(`${environment.apiUrl}/trailer/${id}`);
  }

  getSynopsis(id: number) {
    return this.http.get<Synopsis>(`${environment.apiUrl}/mdb/synopsis/${id}`);
  }
  
}
