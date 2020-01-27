import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';

import { AnonymousGuard } from '../core/helpers/anonymous.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component : RegisterComponent, canActivate: [AnonymousGuard]},
  { path: 'userCart', component : UserCartComponent},
  { path: 'unauthorized', component : ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}