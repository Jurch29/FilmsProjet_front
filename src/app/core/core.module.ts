import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { PublicModule } from '../public/public.module';
import { ProtectedModule } from '../protected/protected.module';

import { HelpersModule } from './helpers/helpers.module';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


@NgModule({
  declarations: [NavbarComponent, FooterComponent, SidenavComponent],
  imports: [
    PublicModule,
    ProtectedModule,
    SharedModule,
    HelpersModule,
    HttpClientModule
  ],
  exports: [NavbarComponent, FooterComponent, SidenavComponent],
  providers: [
    
  ]
})
export class CoreModule { 

constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) { 
      throw new Error('CoreModule is already loaded.'); 
    } 
  } 
}