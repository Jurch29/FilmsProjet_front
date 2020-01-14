import { Component, OnInit, OnDestroy } from '@angular/core';
import { NumberOfItemsInCartService } from 'src/app/core/service/number-of-items-in-cart.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit,OnDestroy {

  infobulecontainer :any;

  ngOnDestroy() {
    this.infobulecontainer.clear();
  }
  year:string ="2019";
  duration:string  ="110";
  synopsis:string =" de d e djkenkjndenjdnjkenkjdbehjbdjhevjdgvegvghdvgevdghvevdghveghdvevgvdevhdgevhgdveghvdhgevhgdvegdbebhgvchbcbhrvicUVCUVUCYvucevevgcyvcevcevcvcehoixejoidhicrgyguCBUVEveecbyVCvec";
  title:string ="MALEFIQUE" ;
  rating:number=3;
  realisators:string="Mikael Plage";
  actors:string="Bras trou";
  constructor(private numberofitemsincartService : NumberOfItemsInCartService) { }

  ngOnInit() {
  }
  addToCart(){
    this.numberofitemsincartService.ChangeNumberOfItemsInCartMessage(this.numberofitemsincartService.getItemsCount()+1);
  }

}
