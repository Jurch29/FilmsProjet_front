import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCartHistoryComponent } from './components/user-cart-history/user-cart-history.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserCommentHistoryComponent } from './components/user-comment-history/user-comment-history.component';
import { AdministrationComponent } from './administration/administration/administration.component';

import { AuthGuard } from '../core/helpers/auth.guard';
import { Role } from '../shared/models/role';

const routesprotected: Routes = [
  { path: 'userDetails', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: 'userCartHistory', component: UserCartHistoryComponent, canActivate: [AuthGuard] },
  { path: 'userCommentHistory', component: UserCommentHistoryComponent, canActivate: [AuthGuard] },
  { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } }
];

@NgModule({
  imports: [RouterModule.forChild(routesprotected)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
