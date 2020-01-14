import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCartHistoryComponent } from './components/user-cart-history/user-cart-history.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';


const routesprotected: Routes = [
  { path: 'userDetails', component: UserDetailsComponent },
  { path: 'userCartHistory', component: UserCartHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routesprotected)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
