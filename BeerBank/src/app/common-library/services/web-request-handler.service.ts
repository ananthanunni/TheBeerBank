import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigProviderService } from './config-provider.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestHandlerService {

  httpOptions: any;
  constructor(private configProvider: ConfigProviderService, private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders()
        .set("content-type", "application/json")
    };
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<TIn, TOut>(url: string, value: TIn = null): Observable<TOut> {
    return this.http.post<TOut>(url, value || null, { headers: this.httpOptions });
  }

  put<TIn,TOut>(url: string, value: TIn): Observable<any> {
    return this.http.put<TOut>(url, value || null, { headers: this.httpOptions });
  }

  delete<TIn>(url: string, value: TIn): Observable<any> {
    return this.http.delete(url + (url.endsWith("/") ? "" : "/") + value);
  }
}
