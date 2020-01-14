import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { MatCardModule } from '@angular/material/';
import { UserCartItemComponent } from './user-cart-item/user-cart-item.component';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { User } from 'src/app/shared/models/user';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  @ViewChild("itemcontainer", { static : false,read: ViewContainerRef }) container;
  
  items : boolean = false;
  private componentRef: ComponentRef<any>;
  private componentFactory: ComponentFactory<any>;
  currentUser: User;
  
  constructor(private navbar: NavbarComponent,private authenticationService: AuthenticationService,private resolver: ComponentFactoryResolver) { 
    this.componentFactory = this.resolver.resolveComponentFactory(UserCartItemComponent);
  }
  buy(){
    console.log("achat passé");
  }
  ngOnInit() {
    this.authenticationService.currentUser.subscribe(dataTransmited =>
      this.currentUser =dataTransmited
      );
  }
  CreateComponentCartItem(){
    this.items=true;
    this.componentRef = this.container.createComponent(this.componentFactory, 0);
    this.componentRef.instance.url = 'http://image.tmdb.org/t/p/w500/vloNTScJ3w7jwNwtNGoG8DbTThv.jpg';
    this.componentRef.instance.movieTitle = 'Malefique';
    this.componentRef.instance.BuyDate = '2018';
    this.componentRef.instance.NumberOfItems = 3;
    this.componentRef.instance.TotalCost = "10.50€";
  }
  login(){
    this.navbar.openLoginDialog();
  }
}
