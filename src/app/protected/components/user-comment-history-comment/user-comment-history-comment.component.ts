import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Comment } from 'src/app/shared/models/comment';
import { CommentService } from 'src/app/core/service/comment.service';

@Component({
  selector: 'app-user-comment-history-comment',
  templateUrl: './user-comment-history-comment.component.html',
  styleUrls: ['./user-comment-history-comment.component.css']
})
export class UserCommentHistoryCommentComponent {
  private date : String;
  private movieTitle : String;
  private commentContent : String;
  @Input()
  private comment : Comment;

  constructor(private commentService : CommentService, private datePipe : DatePipe) {}

  ngOnInit() {
    this.date = this.formatDate(this.comment.movieUserCommentDate.toString());
    this.commentService.getMovieByCommentId(this.comment.movieUserCommentId)
    .subscribe(
      data => {
        this.movieTitle = data.movieTitle;
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
}
