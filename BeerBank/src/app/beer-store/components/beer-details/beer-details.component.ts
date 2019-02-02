import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beer } from '../../models/Beer';
import { BeerProviderService } from '../../services/beer-provider.service';
import { AdvancedSearchProviderService } from '../../services/advanced-search-provider.service';

@Component({
  selector: 'beer-store-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {
  similarBeers: Beer[];

  @Input("mode")
  mode:"simple"|"advanced";

  constructor(
    private beerProvider:BeerProviderService,
    private advancedSearchProvider:AdvancedSearchProviderService,
    public dialogRef: MatDialogRef<BeerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public model: Beer) {
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.beerProvider.getSimilarBeers(this.model.id, this.mode==="simple" ? this.beerProvider.beerCollection:this.advancedSearchProvider.beerCollection)
    .subscribe(similar=>{
      this.similarBeers=similar;
    });
  }

  onSimilarBeerSelected(beer:Beer){
    this.dialogRef.close(beer);
  }
}
