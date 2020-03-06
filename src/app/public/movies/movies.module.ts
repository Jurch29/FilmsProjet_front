import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { MoviesComponent } from './movies/movies.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MoviePreviewComponent } from '../movies/movie-preview/movie-preview.component';

import { RatingModule } from 'ng-starrating';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RouterModule } from '@angular/router';
import { MovieCommentComponent } from './movie-comment/movie-comment.component';

@NgModule({
  declarations: [MoviesComponent,MoviePreviewComponent,MovieCardComponent, MovieDetailsComponent, MovieCommentComponent],
  imports: [
    SharedModule,
    RouterModule,
    RatingModule,
    MatCarouselModule
  ],
  exports: [MoviePreviewComponent],
  entryComponents: [MovieCardComponent]
})
export class MoviesModule { }
