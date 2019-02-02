import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { BeerProviderService } from '../../services/beer-provider.service';
import { Beer } from '../../models/Beer';
import { staggeredFadeAnimation } from 'src/app/common-library/animations/Animations';
import { Subscription } from 'rxjs';
import { BeerCardComponent } from '../beer-card/beer-card.component';

@Component({
  selector: 'beer-store-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [staggeredFadeAnimation]
})
export class IndexComponent implements OnInit, OnDestroy {

  constructor(private beerProvider: BeerProviderService) { }

  @ViewChildren("beerCard")
  beerCards:QueryList<BeerCardComponent>;

  isLoadingBeers = true;
  beerCollection: Beer[] = this.beerProvider.beerCollection;
  favorites: Beer[] = [];

  listenToScrollEnd=false;

  private isLoadingSubscription: Subscription = null;
  ngOnInit() {
    this.beerCollection = this.beerProvider.beerCollection;
    this.listenToScrollEnd=false;

    this.isLoadingSubscription = this.beerProvider.isLoadingBeers
      .subscribe(isLoading => {
        this.isLoadingBeers = isLoading;

        if (!this.isLoadingBeers) {
          this.beerCollection = this.beerProvider.beerCollection;

          this.listenToScrollEnd=true;
        }
      });

    if(!this.beerProvider.init()){
      this.beerProvider.searchText.next("");
    }
  }

  ngOnDestroy() {
    if (this.isLoadingSubscription)
      this.isLoadingSubscription.unsubscribe();
  }

  onScrollEnd(){
    this.beerProvider.getPage();
  }

  onFavoriteChanged(item: Beer) {
    if (!item.isFavorite)
      this.beerProvider.addFavorite(item);
    else
      this.beerProvider.removeFavorite(item);
  }

  onSimilarBeerSelected(beer:Beer){
    let item=this.beerCards.find(c=>c.model.id===beer.id);
    item.openDialog();
  }
}
