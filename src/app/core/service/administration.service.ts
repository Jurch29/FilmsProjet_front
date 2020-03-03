import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/app/shared/models/movie';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  
  constructor(private http: HttpClient) { }

  updateUser(user : User) {
    let username = user.userLastname;
    let firstname = user.userFirstname;
    let login = user.userLogin;
    let email = user.userEmail;
    let userid = user.userId;
    return this.http.post<User>(`${environment.apiUrl}/administration/updateuser`, { userid, username, firstname, login, email });
  }

  deleteUser(userId : number) {
    return this.http.delete<User>(`${environment.apiUrl}/administration/deleteuser/${userId}`);
  }

  updatePassword(userid: string, password: string){
    return this.http.post<User>(`${environment.apiUrl}/administration/updatepassword`, { userid, password });
  }

  addUser(user: User){
    let username = user.userLastname;
    let firstname = user.userFirstname;
    let login = user.userLogin;
    let email = user.userEmail;
    let password = user.userPassword;
    return this.http.post<User>(`${environment.apiUrl}/administration/adduser`, { username, firstname, login, email, password });
  }

  deleteMovie(movieId: any) {
    return this.http.delete<Movie>(`${environment.apiUrl}/administration/deletemovie/${movieId}`);
  }

  updateMovie(updatedMovie: Movie) {
    let movieTitle = updatedMovie.movieTitle;
    let moviePrice = updatedMovie.moviePrice;
    let movieDate = updatedMovie.movieDate;
    let movieImagePath = updatedMovie.movieImagePath;
    let movieTrailerPath = updatedMovie.movieTrailerPath;
    let movieDuration = updatedMovie.movieDuration;
    return this.http.post<Movie>(`${environment.apiUrl}/administration/updatemovie`, { movieTitle, moviePrice, movieDate, movieImagePath, movieTrailerPath, movieDuration });
  }

}