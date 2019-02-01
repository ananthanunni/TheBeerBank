import { Component, OnInit } from '@angular/core';
import { BeerProviderService } from '../../services/beer-provider.service';
import { Beer } from '../../models/Beer';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private beerProvider: BeerProviderService) { }

  isLoadingBeers=true;
  beerCollection: Beer[] = [];
  ngOnInit() {
    this.getBeerPage();
  }

  private getBeerPage(pageNumber: number = 1) {
    this.isLoadingBeers=true;

    this.beerProvider.getPage()
      .subscribe(beers => {
        for (let item of beers)
          this.beerCollection.push(item);

          this.isLoadingBeers=false;
      });
  }
}
