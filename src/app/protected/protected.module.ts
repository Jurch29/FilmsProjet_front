import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module'; 

import { ProtectedRoutingModule } from './protected-routing.module';
import { UserCartHistoryComponent } from './components/user-cart-history/user-cart-history.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';


@NgModule({
  declarations: [UserCartHistoryComponent, UserDetailsComponent],
  imports: [
    SharedModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
