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

  isHovering=false;

  @Output("onFavoriteChanged")
  onFavoriteChanged=new EventEmitter<Beer>();

  ngOnInit() {

  }

  toggleFavorite(){
    this.onFavoriteChanged.emit(this.model);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BeerDetailsComponent, {
      width: '600px',
      data: this.model
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
