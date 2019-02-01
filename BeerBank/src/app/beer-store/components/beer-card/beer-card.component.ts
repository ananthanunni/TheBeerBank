import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Beer } from '../../models/Beer';

@Component({
  selector: 'beer-store-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss']
})
export class BeerCardComponent implements OnInit {
  constructor() { }

  @Input("beer")
  model:Beer;

  isHovering=false;

  @Output("onFavoriteChanged")
  onFavoriteChanged=new EventEmitter<boolean>();

  ngOnInit() {
  }

  toggleFavorite(item:Beer){
    item.isFavorite=!item.isFavorite;;
    this.onFavoriteChanged.emit(this.item.isFavorite);
  }
}
