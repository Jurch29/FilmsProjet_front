import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component'; 
import { MoviePreviewComponent } from '../components/movie-preview/move-preview/movie-preview.component';
import { MoviePreviewModule } from '../components/movie-preview/movie-preview.module';




@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    MoviePreviewModule
  ],
  entryComponents: [MoviePreviewComponent]
})
export class HomeModule { }
