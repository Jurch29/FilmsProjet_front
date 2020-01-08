import { ChangeDetectorRef, Component, OnDestroy, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnChanges, OnDestroy {

  @Input() subMenuState;
  @ViewChild('snav', {static: false}) public sidenav: MatSidenav;

  mobileQuery: MediaQueryList;
  opened: boolean;
  showMenu = true;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  toggleMenu() {
      this.showMenu = !this.showMenu;
      this.sidenav.toggle();
   }
  ngOnInit() {
  }

  ngOnChanges(){
    console.log("inside ngOnChanges with subMenuState: ",this.subMenuState );
    this.showMenu = this.subMenuState;
    this.sidenav.toggle();
  }

}
