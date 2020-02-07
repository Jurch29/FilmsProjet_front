import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCartHistoryComponent } from './components/user-cart-history/user-cart-history.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserCommentHistoryComponent } from './components/user-comment-history/user-comment-history.component';

import { AuthGuard } from '../core/helpers/auth.guard';


const routesprotected: Routes = [
  { path: 'userDetails', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: 'userCartHistory', component: UserCartHistoryComponent, canActivate: [AuthGuard] },
  { path: 'userCommentHistory', component: UserCommentHistoryComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routesprotected)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
