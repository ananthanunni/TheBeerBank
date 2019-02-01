import { Injectable } from '@angular/core';
import { WebRequestHandlerService } from 'src/app/common-library/services/web-request-handler.service';
import { Beer } from '../models/Beer';
import { UrlProviderService } from 'src/app/common-library/services/url-provider.service';

@Injectable({
  providedIn: 'root'
})
export class BeerProviderService {
  constructor(private webRequest:WebRequestHandlerService, private urlProvider:UrlProviderService) {
    
   }

   private pageSize=18;
   getPage(pageNumber:number=1){
      return this.webRequest.get<Beer[]>(this.urlProvider.getBeerPage(pageNumber, this.pageSize))
   }
}
