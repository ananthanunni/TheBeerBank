import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  constructor() { }
  private defaultPageSize=18;

  private baseUrl="https://api.punkapi.com/v2/";

  private getBeer=this.baseUrl+"beers";
  public getBeerPage(pageNumber:number=1, pageSize:number=this.defaultPageSize){
    return this.urlFormat(this.getBeer+"?page={0}&per_page={1}",[pageNumber.toString(),pageSize.toString()]);
  }

  public getBeerPageSearchText(pageNumber:number=1, pageSize:number=this.defaultPageSize, searchText:string){
    return this.urlFormat(this.getBeer+"?page={0}&per_page={1}&beer_name={2}",[pageNumber.toString(),pageSize.toString(),encodeURIComponent(searchText)]);
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
