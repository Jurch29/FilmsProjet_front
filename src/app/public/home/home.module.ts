import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component'; 
import { MoviePreviewModule } from '../components/movie-preview/movie-preview.module';
import { MoviePreviewComponent } from '../components/movie-preview/movie-preview/movie-preview.component';




@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    MoviePreviewModule
  ],
  entryComponents: [MoviePreviewComponent]
})
export class HomeModule { }
