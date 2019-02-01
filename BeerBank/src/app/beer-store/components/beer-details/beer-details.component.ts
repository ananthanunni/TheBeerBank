import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beer } from '../../models/Beer';
import { BeerProviderService } from '../../services/beer-provider.service';

@Component({
  selector: 'beer-store-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {
  similarBeers: Beer[];

  constructor(
    private beerProvider:BeerProviderService,
    public dialogRef: MatDialogRef<BeerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public model: Beer) {
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.beerProvider.getSimilarBeers(this.model.id)
    .subscribe(similar=>{
      this.similarBeers=similar;
    });
  }

}
