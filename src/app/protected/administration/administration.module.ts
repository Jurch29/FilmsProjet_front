import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration/administration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersadmComponent } from './usersadm/usersadm.component';
import { MoviesadmComponent } from './moviesadm/moviesadm.component';
import { ChangepasswordadmComponent } from './changepasswordadm/changepasswordadm.component';
import { AdduseradmComponent } from './adduseradm/adduseradm.component';
import { AddmovieadmComponent } from './addmovieadm/addmovieadm.component';
import { DatamovieadmComponent } from './datamovieadm/datamovieadm.component';

@NgModule({
  declarations: [AdministrationComponent, UsersadmComponent, MoviesadmComponent, ChangepasswordadmComponent, AdduseradmComponent, AddmovieadmComponent, DatamovieadmComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents : [ChangepasswordadmComponent,AdduseradmComponent, AddmovieadmComponent]
})
export class AdministrationModule { }
