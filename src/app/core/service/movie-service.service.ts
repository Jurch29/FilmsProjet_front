import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/app/shared/models/movie';
import { Actor } from 'src/app/shared/models/actor';
import { Author } from 'src/app/shared/models/author';
import { Category } from 'src/app/shared/models/category';
import { Trailer } from 'src/app/shared/models/trailer';
import { Synopsis } from 'src/app/shared/models/synopsis';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  getAllMovies() {
    return this.http.get<Movie[]>(`${environment.apiUrl}/movie/movies`);
  }

  getMovieById(id : number) {
    return this.http.get<Movie>(`${environment.apiUrl}/movies/${id}`);
  }

  getActorByMovieId(id : number) {
    return this.http.get<Actor[]>(`${environment.apiUrl}/actors/${id}`);
  }

  getAllActors() {
    return this.http.get<Actor[]>(`${environment.apiUrl}/actors`);
  }

  getAuthorsByMovieId(id : number) {
    return this.http.get<Author[]>(`${environment.apiUrl}/author/${id}`);
  }

  getAllAuthors() {
    return this.http.get<Author[]>(`${environment.apiUrl}/author`);
  }

  getCategorysByMovieId(id : number) {
    return this.http.get<Category[]>(`${environment.apiUrl}/category/${id}`);
  }
  
  getAllCategorys() {
    return this.http.get<Category[]>(`${environment.apiUrl}/category`);
  }

  getTrailersByMovieId(id : number) {
    return this.http.get<Trailer[]>(`${environment.apiUrl}/trailer/${id}`);
  }

  getSynopsis(id : number) {
    return this.http.get<Synopsis>(`${environment.apiUrl}/synopsis/${id}`);
  }
}
