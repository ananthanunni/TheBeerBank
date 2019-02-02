import { Injectable } from '@angular/core';
import { WebRequestHandlerService } from 'src/app/common-library/services/web-request-handler.service';
import { UrlProviderService } from 'src/app/common-library/services/url-provider.service';
import { AdvancedSearchParams } from '../models/AdvancedSearchParams';
import { Beer } from '../models/Beer';
import { BeerProviderService } from './beer-provider.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvancedSearchProviderService {
  constructor(private webRequest: WebRequestHandlerService, private urlProvider: UrlProviderService, private beerProvider: BeerProviderService) { }

  lastPageReached:boolean;

  search(searchParams: AdvancedSearchParams, pageNumber: number = 1) {
    if (pageNumber === 1){
      this.beerCollection = [];
      this.lastPageReached=false;
    }

    let url = this.urlProvider.getBeerAdvanced(searchParams, pageNumber);

    let subject = new Subject<Beer[]>();

    if(!this.lastPageReached){
    this.webRequest.get<Beer[]>(url)
      .subscribe(beers => {
        if(beers.length===0)
          this.lastPageReached=true;

        beers.forEach(b=>{
          let favItem=this.beerProvider.favoriteBeerCollection.find(fi=>fi.id===b.id);

          if(!!favItem)
            b.isFavorite=favItem.isFavorite;

          this.beerCollection.push(b);
        });

        subject.next(this.beerCollection);
        subject.complete();
      });
    }
    else{
      subject.next(this.beerCollection);
      subject.complete();
    }

    return subject;
  }

  beerCollection: Beer[] = [];
}


