import { NgModule } from '@angular/core';
import { RatingModule } from 'ng-starrating';
import { MoviePreviewComponent } from './move-preview/movie-preview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieCardComponent } from './movie-card/movie-card/movie-card.component';

@NgModule({
  declarations: [MoviePreviewComponent, MovieCardComponent],
  imports: [
    SharedModule,
    RatingModule
  ],
  exports: [ MoviePreviewComponent ],
  entryComponents : [MovieCardComponent]
})
export class MoviePreviewModule { }
