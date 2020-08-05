import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/shared/models/comment';
import { CommentService } from 'src/app/core/service/comment.service';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-movie-comment',
  templateUrl: './movie-comment.component.html',
  styleUrls: ['./movie-comment.component.css']
})
export class MovieCommentComponent {
  @Input()
  public comment : Comment;
  @Input()
  public user : User;
  public date : String;
  public username : String;
  public commentContent : String;

  constructor(private commentService : CommentService, private datePipe : DatePipe) {}

  ngOnInit() {
    this.date = this.formatDate(this.comment.movieUserCommentDate.toString());
    this.commentService.getUserByCommentId(this.comment.movieUserCommentId)
    .subscribe(
      data => {
        this.username = data.userFirstname;
      },
      error => {
        console.log(error);
      }
    );
    this.commentService.getCommentContentByCommentId(this.comment.movieUserCommentId)
    .subscribe(
      data => {
        this.commentContent = data.commentContent;
      },
      error => {
        console.log(error);
      }
    );
  }

  formatDate(strDate : string) {
    let date = new Date(strDate);
    let formattedDate = this.datePipe.transform(date, 'dd-MM-yyyy');
    return formattedDate;
  }

  DeleteComment(value){
    //TODO
  }

  DeleteImage(value1,value2){
    //TODO
  }

  SaveComment(value){
    //TODO
  }

  onFileSelected(){
    //TODO
  }
}
