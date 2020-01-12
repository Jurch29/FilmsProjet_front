import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component'; 
import { RatingModule } from 'ng-starrating';




@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    RatingModule,
  ]
})
export class HomeModule { }
