import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdvancedSearchProviderService } from '../../services/advanced-search-provider.service';
import { Beer } from '../../models/Beer';
import { AdvancedSearchParams } from '../../models/AdvancedSearchParams';
import { staggeredFadeAnimation } from 'src/app/common-library/animations/Animations';
import { BeerProviderService } from '../../services/beer-provider.service';
import { BeerCardComponent } from '../beer-card/beer-card.component';

@Component({
  selector: 'beer-store-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
  animations: [staggeredFadeAnimation]
})
export class AdvancedSearchComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private advancedSearchProvider: AdvancedSearchProviderService, private beerProvider: BeerProviderService) { }

  @ViewChildren("beerCard")
  beerCards: QueryList<BeerCardComponent>;

  ngOnInit() {
  }

  searchForm = this.formBuilder.group({
    "search": this.formBuilder.group({
      "ibuMax": this.formBuilder.control(""),
      "ibuMin": this.formBuilder.control(""),

      "abvMax": this.formBuilder.control(""),
      "abvMin": this.formBuilder.control(""),

      "ebcMax": this.formBuilder.control(""),
      "ebcMin": this.formBuilder.control(""),

      "brewedBefore": this.formBuilder.control(""),
      "brewedAfter": this.formBuilder.control("")
    })
  });

  get beerCollection() { return this.advancedSearchProvider.beerCollection; }
  pageNumber = 0;
  isSearching = false;
  search() {
    this.pageNumber = 0;

    this.loadBeers();
  }

  onScrollEnd() {
    if (this.isSearching || this.advancedSearchProvider.lastPageReached) return;

    this.loadBeers(++this.pageNumber);
  }

  private loadBeers(pageNumber: number = 1) {
    let params = this.getControl("search").value as AdvancedSearchParams;
    this.isSearching = true;

    this.advancedSearchProvider.search(params, pageNumber)
      .subscribe(result => {
        this.isSearching = false;
      });
  }

  getControl(key: string) {
    return this.searchForm.get(key);
  }

  onFavoriteChanged(item: Beer) {
    if (!item.isFavorite)
      this.beerProvider.addFavorite(item);
    else
      this.beerProvider.removeFavorite(item);
  }

  onSimilarBeerSelected(beer: Beer) {
    let item = this.beerCards.find(c => c.model.id === beer.id);
    item.openDialog();
  }
}
