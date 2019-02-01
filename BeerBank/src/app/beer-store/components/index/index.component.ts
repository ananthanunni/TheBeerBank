import { Component, OnInit } from '@angular/core';
import { BeerProviderService } from '../../services/beer-provider.service';
import { Beer } from '../../models/Beer';
import { staggeredFadeAnimation } from 'src/app/common-library/animations/Animations';

@Component({
  selector: 'beer-store-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations:[staggeredFadeAnimation]
})
export class IndexComponent implements OnInit {

  constructor(private beerProvider: BeerProviderService) { }

  isLoadingBeers = true;
  beerCollection: Beer[] = [];
  favorites: Beer[] = [];

  ngOnInit() {
    this.beerCollection=this.beerProvider.beerCollection;

    if(this.beerCollection.length===0)
      this.getBeerPage();
  }

  private getBeerPage(pageNumber: number = 1) {
    this.isLoadingBeers = true;

    this.beerProvider.getPage()
      .subscribe(beers => {
        for (let item of beers) {
          this.beerCollection.push(item);
        }

        this.beerProvider.addToCollection(beers);

        this.isLoadingBeers = false;
      });
  }

  onFavoriteChanged(item:Beer){
    if(!item.isFavorite)
      this.beerProvider.addFavorite(item);
    else
      this.beerProvider.removeFavorite(item);
  }
}
