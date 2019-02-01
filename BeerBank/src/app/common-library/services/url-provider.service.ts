import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  constructor() { }

  private baseUrl="https://api.punkapi.com/v2/";

  private getBeer=this.baseUrl+"beers";
  public getBeerPage(pageNumber:number=1, pageSize:number=18){
    return this.urlFormat(this.getBeer+"?page={0}&per_page={1}",[pageNumber.toString(),pageSize.toString()]);
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
