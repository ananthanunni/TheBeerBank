import { Injectable } from '@angular/core';
import { WebRequestHandlerService } from 'src/app/common-library/services/web-request-handler.service';
import { Beer } from '../models/Beer';
import { UrlProviderService } from 'src/app/common-library/services/url-provider.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerProviderService {
  constructor(private webRequest: WebRequestHandlerService, private urlProvider: UrlProviderService) {

  }

  beerCollection: Beer[] = [];
  favoriteBeerCollection: Beer[] = [];

  isLoadingBeers = new Subject<boolean>();

  private lastPageReached = false;
  private lastSearchText = null;
  searchText = new Subject<string>();
  seachTextValue: string = null;

  private pageSize = 24;
  private pageNumber = 0;
  private initialized = false;

  init() {
    if (!this.initialized) {
      this.searchText
        .subscribe(searchText => {
          if (this.lastSearchText === searchText) return;

          this.seachTextValue = searchText;

          this.pageNumber = 0;
          this.beerCollection = [];
          this.getPage();
        });

      this.getPage();
      this.initialized = true;

      return true;
    }
    else {
      this.isLoadingBeers.next(false);
      return false;
    }
  }

  getPage() {
    let isNewSearchText = this.lastSearchText !== this.seachTextValue;
    this.lastSearchText = this.seachTextValue;

    let subject = new Subject<Beer[]>();
    this.isLoadingBeers.next(true);

    let url = !this.seachTextValue ?
      this.urlProvider.getBeerPage(++this.pageNumber, this.pageSize) :
      this.urlProvider.getBeerPageSearchText(++this.pageNumber, this.pageSize, this.seachTextValue);

    if (isNewSearchText)
      this.beerCollection = [];

    if (!this.lastPageReached || isNewSearchText) {
      this.webRequest.get<Beer[]>(url)
        .subscribe(newItems => {
          if (newItems.length === 0) {
            this.lastPageReached = true;
          }
          else {
            for (let item of newItems) {
              let currentFavItem = this.favoriteBeerCollection.find(t => t.id === item.id);

              if (!!currentFavItem)
                item.isFavorite = currentFavItem.isFavorite;

              this.beerCollection.push(item);
            }
          }

          subject.next(this.beerCollection);
          this.isLoadingBeers.next(false);
          subject.complete();
        });
    }
    else{
      subject.next(this.beerCollection);
      this.isLoadingBeers.next(false);
      subject.complete();
    }

    return subject;
  }

  addFavorite(beer: Beer) {
    this.favoriteBeerCollection.push(beer);
    beer.isFavorite = true;
  }

  removeFavorite(beer: Beer) {
    this.favoriteBeerCollection.splice(this.favoriteBeerCollection.indexOf(beer), 1);
    let collectionItem=this.beerCollection.find(b=>b.id===beer.id);

    beer.isFavorite = false;
    collectionItem.isFavorite=false;
  }  

  getSimilarBeers(id: number, source:Beer[], randomCount: number = 3) {
    let subject = new Subject<Beer[]>();

    let randomElements: Beer[] = [];

    if(randomCount>source.length-1){
      randomCount=source.length-1;
    }

    setTimeout(() => {
      while (randomElements.length < randomCount) {
        let newItem = source[Math.floor(Math.random() * source.length)];

        let alreadyContains = (randomElements.findIndex(item => item.id === newItem.id) >= 0);
        if (newItem.id === id || alreadyContains)
          continue;

        randomElements.push(newItem);
      }

      subject.next(randomElements);
      subject.complete();
    });

    return subject;
  }
}
