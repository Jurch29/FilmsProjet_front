import { NgModule } from '@angular/core';
import { RatingModule } from 'ng-starrating';
import { MoviePreviewComponent } from './move-preview/movie-preview.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MoviePreviewComponent],
  imports: [
    SharedModule,
    RatingModule
  ],
  exports: [ MoviePreviewComponent ]
})
export class MoviePreviewModule { }
