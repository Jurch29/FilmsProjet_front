import { Component, OnInit, OnDestroy } from '@angular/core';
import { NumberOfItemsInCartService } from 'src/app/core/service/number-of-items-in-cart.service';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  infobulecontainer :any;

  close() {
    this.infobulecontainer.clear();
  }
  synopsis:string =" de d e djkenkjndenjdnjkenkjdbehjbdjhevjdgvegvghdvgevdghvevdghveghdvevgvdevhdgevhgdveghvdhgevhgdvegdbebhgvchbcbhrvicUVCUVUCYvucevevgcyvcevcevcvcehoixejoidhicrgyguCBUVEveecbyVCvec";
  
  constructor(private numberofitemsincartService : NumberOfItemsInCartService) { }

  ngOnInit() {
  }
  addToCart(){
    this.numberofitemsincartService.ChangeNumberOfItemsInCartMessage(this.numberofitemsincartService.getItemsCount()+1);
  }

}
