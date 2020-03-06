import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/shared/models/movie';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/shared/models/comment';
import { CommentContent } from 'src/app/shared/models/comment-content';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getCommentsByUserId(id : number) {
    return this.http.get<Comment[]>(`${environment.apiUrl}/user/comments/${id}`);
  }

  getCommentsByMovieId(id : number) {
    return this.http.get<Comment[]>(`${environment.apiUrl}/movie/comments/${id}`);
  }

  getMovieByCommentId(id : number) {
    return this.http.get<Movie>(`${environment.apiUrl}/user/commentmovie/${id}`);
  }

  getUserByCommentId(id : number) {
    return this.http.get<User>(`${environment.apiUrl}/movie/commentuser/${id}`);
  }

  getCommentContentByCommentId(id : number) {
    return this.http.get<CommentContent>(`${environment.apiUrl}/user/commentcontent/${id}`);
  }
}
