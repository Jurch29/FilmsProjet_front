import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration/administration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersadmComponent } from './usersadm/usersadm.component';
import { MoviesadmComponent } from './moviesadm/moviesadm.component';

@NgModule({
  declarations: [AdministrationComponent, UsersadmComponent, MoviesadmComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdministrationModule { }
