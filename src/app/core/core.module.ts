import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { PublicModule } from '../public/public.module';
import { ProtectedModule } from '../protected/protected.module';

import { HelpersModule } from './helpers/helpers.module';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { FilterbarComponent } from './components/filterbar/filterbar.component';


@NgModule({
  declarations: [NavbarComponent, FooterComponent, SidenavComponent, FilterbarComponent],
  imports: [
    PublicModule,
    ProtectedModule,
    SharedModule,
    HelpersModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [NavbarComponent, FooterComponent, SidenavComponent,FilterbarComponent],
  providers: [
    AppComponent,
    NavbarComponent
  ]
})
export class CoreModule { 

constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) { 
      throw new Error('CoreModule is already loaded.'); 
    } 
  } 
}