import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';

import { AnonymousGuard } from '../core/helpers/anonymous.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { MoviesComponent } from './movies/movies/movies.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { PasswordresetComponent } from './components/passwordreset/passwordreset.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'nowMoreMovie/:movieID', component: MovieDetailsComponent},
  { path: 'register', component : RegisterComponent, canActivate: [AnonymousGuard]},
  { path: 'userCart', component : UserCartComponent},
  { path: 'unauthorized', component : ForbiddenComponent},
  { path: 'passwordreset', component : PasswordresetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}