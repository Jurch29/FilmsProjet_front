import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/app/shared/models/movie';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  
  constructor(private http: HttpClient,public datepipe: DatePipe) { }

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
    let movieId = updatedMovie.movieId;
    let movieTitle = updatedMovie.movieTitle;
    let moviePrice = updatedMovie.moviePrice;
    let movieDate = updatedMovie.movieDate;
    let movieImagePath = updatedMovie.movieImagePath;
    let movieTrailerPath = updatedMovie.movieTrailerPath;
    let movieDuration = updatedMovie.movieDuration;
    return this.http.post<Movie>(`${environment.apiUrl}/administration/updatemovie`, { movieId, movieTitle, moviePrice, movieDate, movieImagePath, movieTrailerPath, movieDuration });
  }

  addMovie(movie,synopsis) {
    return this.http.post<any>(`${environment.apiUrl}/administration/addmovie`, { movie,synopsis });
  }

  deleteActor(id: number){
    return this.http.delete<Movie>(`${environment.apiUrl}/administration/deleteactor/${id}`);
  }

  deleteAuthor(id: number){
    return this.http.delete<Movie>(`${environment.apiUrl}/administration/deleteauthor/${id}`);
  }

  deleteCategory(id: number){
    return this.http.delete<Movie>(`${environment.apiUrl}/administration/deletecategory/${id}`);
  }

  addActor(firstname,lastname){
    return this.http.post<any>(`${environment.apiUrl}/administration/addactor`, { firstname,lastname });
  }

  addAuthor(firstname,lastname){
    return this.http.post<any>(`${environment.apiUrl}/administration/addauthor`, { firstname,lastname });
  }

  addCategory(category){
    return this.http.post<any>(`${environment.apiUrl}/administration/addcategory`, { category });
  }

  formatDate(srtdate: Date) {
    var re = /0000/gi; 
    let date = new Date(srtdate.toString().replace(re, "00:00"));
    let formattedDate =new Date(this.datepipe.transform(date, 'dd-MM-yyyy'));
    return formattedDate;
  }

}