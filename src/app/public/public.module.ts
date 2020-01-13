import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module'; 

import { PublicRoutingModule } from './public-routing.module';
import { HomeModule } from './home/home.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';


@NgModule({
  declarations: [RegisterComponent, LoginComponent, UserCartComponent],
  imports: [
    SharedModule,
    PublicRoutingModule,
    HomeModule
  ],
  exports: [ RegisterComponent, LoginComponent],
  entryComponents: [LoginComponent]
})
export class PublicModule { }
