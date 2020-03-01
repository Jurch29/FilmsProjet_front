import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration/administration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersadmComponent } from './usersadm/usersadm.component';
import { MoviesadmComponent } from './moviesadm/moviesadm.component';
import { ChangepasswordadmComponent } from './changepasswordadm/changepasswordadm.component';
import { AdduseradmComponent } from './adduseradm/adduseradm.component';

@NgModule({
  declarations: [AdministrationComponent, UsersadmComponent, MoviesadmComponent, ChangepasswordadmComponent, AdduseradmComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents : [ChangepasswordadmComponent,AdduseradmComponent]
})
export class AdministrationModule { }
