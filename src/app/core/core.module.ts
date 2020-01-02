import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicModule } from '../public/public.module';
import { ProtectedModule } from '../protected/protected.module';
import { NavbarComponent } from './components/navbar/navbar.component';

import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    PublicModule,
    ProtectedModule,
    SharedModule
  ],
  exports: [NavbarComponent, FooterComponent]
})
export class CoreModule { 

constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) { 
      throw new Error('CoreModule is already loaded.'); 
    } 
  } 
} 