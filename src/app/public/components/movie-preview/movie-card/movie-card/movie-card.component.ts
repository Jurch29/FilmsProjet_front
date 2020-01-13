import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit,OnDestroy {

   container :any;

  ngOnDestroy() {
    this.container.clear();
  }
  year:string ="2019";
  duration:string  ="110 min";
  synopsis:string =" de d e djkenkjndenjdnjkenkjdbehjbdjhevjdgvegvghdvgevdghvevdghveghdvevgvdevhdgevhgdveghvdhgevhgdvegdbebhgvchbcbhrvicUVCUVUCYvucevevgcyvcevcevcvcehoixejoidhicrgyguCBUVEveecbyVCvec";
  title:string ="MALEFIQUE" ;
  rating:number=3;
  constructor(private appComponent:AppComponent) { }

  ngOnInit() {
  }
  addToCart(){
    this.appComponent.ChangeNumberOfItemsInCartMessage(this.appComponent.getItemsCount()+1);
  }

}