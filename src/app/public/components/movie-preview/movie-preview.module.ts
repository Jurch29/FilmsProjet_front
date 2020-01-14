import { NgModule } from '@angular/core';
import { RatingModule } from 'ng-starrating';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MoviePreviewComponent } from './movie-preview/movie-preview.component';

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
