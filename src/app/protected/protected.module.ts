import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module'; 

import { ProtectedRoutingModule } from './protected-routing.module';
import { UserCartHistoryComponent } from './components/user-cart-history/user-cart-history.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserCommentHistoryComponent } from './components/user-comment-history/user-comment-history.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserCartHistoryPurchaseComponent } from './components/user-cart-history-purchase/user-cart-history-purchase.component';
import { UserCartHistoryPurchaseItemComponent } from './components/user-cart-history-purchase-item/user-cart-history-purchase-item.component';
import { PasswordCheckComponent } from './components/password-check/password-check.component';


@NgModule({
  declarations: [UserCartHistoryComponent, UserDetailsComponent, UserCommentHistoryComponent, ChangePasswordComponent, UserCartHistoryPurchaseComponent, UserCartHistoryPurchaseItemComponent, PasswordCheckComponent],
  imports: [
    SharedModule,
    ProtectedRoutingModule
  ],
  entryComponents : [ChangePasswordComponent, PasswordCheckComponent]
})
export class ProtectedModule { }
