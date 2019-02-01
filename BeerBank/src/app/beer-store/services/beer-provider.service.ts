import { Injectable } from '@angular/core';
import { WebRequestHandlerService } from 'src/app/common-library/services/web-request-handler.service';
import { Beer } from '../models/Beer';
import { UrlProviderService } from 'src/app/common-library/services/url-provider.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerProviderService {
  constructor(private webRequest: WebRequestHandlerService, private urlProvider: UrlProviderService) {

  }

  beerCollection: Beer[] = [];
  favoriteBeerCollection:Beer[]=[];

  private loadedPageCount=0;
  private pageSize = 12;
  getPage(pageNumber: number = 1) {
    this.loadedPageCount=pageNumber;
    return this.webRequest.get<Beer[]>(this.urlProvider.getBeerPage(pageNumber, this.pageSize));
  }

  addToCollection(beers: Beer[]) {
    for (let item of beers)
      this.beerCollection.push(item);
  }
  
  addFavorite(beer:Beer){
    this.favoriteBeerCollection.push(beer);
    beer.isFavorite=true;
  }

  removeFavorite(beer:Beer){
    this.favoriteBeerCollection.splice(this.favoriteBeerCollection.indexOf(beer),1);
    beer.isFavorite=false;
  }
}
