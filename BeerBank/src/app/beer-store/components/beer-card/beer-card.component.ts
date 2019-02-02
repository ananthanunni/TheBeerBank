import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Beer } from '../../models/Beer';
import { MatDialog } from '@angular/material/dialog';
import { BeerDetailsComponent } from '../beer-details/beer-details.component';

@Component({
  selector: 'beer-store-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss']
})
export class BeerCardComponent implements OnInit {
  constructor(public dialog:MatDialog) { }

  @Input("beer")
  model:Beer;

  @Input("hideSimilarBeers")
  hideSimilarBeers:boolean;

  isHovering=false;

  @Output("onFavoriteChanged")
  onFavoriteChanged=new EventEmitter<Beer>();

  @Output("onSimilarBeerSelected")
  onSimilarBeerSelected=new EventEmitter<Beer>();

  ngOnInit() {
    if(this.hideSimilarBeers===null)
      this.hideSimilarBeers=false;
  }

  toggleFavorite($event:MouseEvent){
    $event.stopPropagation();
    this.onFavoriteChanged.emit(this.model);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BeerDetailsComponent, {
      width: '720px',
      data: this.model
    });

    dialogRef.afterClosed().subscribe((result:Beer) => {
      if(this.hideSimilarBeers)
        return;

      if(!!result)
        this.onSimilarBeerSelected.emit(result);
    });
  }
}
