import { Component, OnInit } from '@angular/core';

export interface Actor {
  value: string;
  viewValue: string;
}

export interface Category {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.css']
})

export class FilterbarComponent implements OnInit {
  categorys : Category[];
  actors :Actor[];
  constructor() { }

  ngOnInit() {
    this.categorys = [
      {value: 'Action', viewValue: 'Action'},
      {value: 'Comedie', viewValue: 'Comédie'}
    ];
    this.actors = [
      {value: 'Brad Pitt', viewValue: 'Brad Pitt'},
      {value: 'Mister T', viewValue: 'Mister T'}
    ];
  }
  onCategoryChange(event){
    if(event.value = "")
    console.log(event);
  }
  onActorChange(event){
    if(event.value = "")
     console.log(event);
  }
}
