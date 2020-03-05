import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/core/service/comment.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { Comment } from 'src/app/shared/models/comment';

@Component({
  selector: 'app-user-comment-history',
  templateUrl: './user-comment-history.component.html',
  styleUrls: ['./user-comment-history.component.css']
})
export class UserCommentHistoryComponent {
  private comments : Comment[];

  constructor(private authenticationService : AuthenticationService, private commentService : CommentService) {}

  ngOnInit() {
    this.commentService.getCommentsByUserId(this.authenticationService.currentUserValue.userId)
    .subscribe(
      data => {
        this.comments = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
