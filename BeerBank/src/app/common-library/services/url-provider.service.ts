import { Injectable } from '@angular/core';
import { AdvancedSearchProviderService } from 'src/app/beer-store/services/advanced-search-provider.service';
import { AdvancedSearchParams } from 'src/app/beer-store/models/AdvancedSearchParams';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  constructor() { }
  private defaultPageSize = 12;

  private baseUrl = "https://api.punkapi.com/v2/";

  private getBeer = this.baseUrl + "beers";
  public getBeerPage(pageNumber: number = 1, pageSize: number = this.defaultPageSize) {
    return this.urlFormat(this.getBeer + "?page={0}&per_page={1}", [pageNumber.toString(), pageSize.toString()]);
  }

  public getBeerPageSearchText(pageNumber: number = 1, pageSize: number = this.defaultPageSize, searchText: string) {
    return this.urlFormat(this.getBeer + "?page={0}&per_page={1}&beer_name={2}", [pageNumber.toString(), pageSize.toString(), encodeURIComponent(searchText)]);
  }

  public getBeerAdvanced(searchParams: AdvancedSearchParams, pageNumber:number=1) {
    let url = this.getBeer;
    type keyValuePair = { key: string; value: string };

    let queryParams: keyValuePair[] = [];

    if (!!searchParams.abvMax)
      queryParams.push({ key: "abv_lt", value: Math.round(searchParams.abvMax).toString() });

    if (!!searchParams.abvMin)
      queryParams.push({ key: "abv_gt", value: Math.round(searchParams.abvMin).toString() });


    if (!!searchParams.ebcMax)
      queryParams.push({ key: "ebc_lt", value: Math.round(searchParams.ebcMax).toString() });

    if (!!searchParams.ebcMin)
      queryParams.push({ key: "ebc_gt", value: Math.round(searchParams.ebcMin).toString() });


    if (!!searchParams.ibuMax)
      queryParams.push({ key: "ibu_lt", value: Math.round(searchParams.ibuMax).toString() });

    if (!!searchParams.ibuMin)
      queryParams.push({ key: "ibu_gt", value: Math.round(searchParams.ibuMin).toString() });


    if (!!searchParams.brewedAfter)
      queryParams.push({ key: "brewed_after", value: encodeURIComponent(searchParams.brewedAfter.format()) });

    if (!!searchParams.brewedBefore)
      queryParams.push({ key: "brewed_before", value: encodeURIComponent(searchParams.brewedBefore.format()) });

    
    queryParams.push({key:"page",value:pageNumber.toString()});
    queryParams.push({key:"per_page", value:this.defaultPageSize.toString()});

    if(queryParams.length!=0)
      url+="?"+queryParams.map((q,i)=>`${q.key}={${i}}`).join("&");

    return this.urlFormat(url,queryParams.map(t=>t.value));
  }

  public urlFormat(template: string, params: string[] = null) {
    var url = template;

    if (params)
      params.forEach((item, index) => {
        url = url.replace(`{${index}}`, item);
      });

    url = url.replace(/(\{\d+\}?\/)/, "");

    return url;
  }
}
