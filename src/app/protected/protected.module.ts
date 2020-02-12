import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module'; 

import { ProtectedRoutingModule } from './protected-routing.module';
import { UserCartHistoryComponent } from './components/user-cart-history/user-cart-history.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserCommentHistoryComponent } from './components/user-comment-history/user-comment-history.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [UserCartHistoryComponent, UserDetailsComponent, UserCommentHistoryComponent, ChangePasswordComponent],
  imports: [
    SharedModule,
    ProtectedRoutingModule
  ],
  entryComponents : [ChangePasswordComponent]
})
export class ProtectedModule { }
