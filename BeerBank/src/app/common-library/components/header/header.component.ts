import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from "rxjs/operators";
import { BeerProviderService } from 'src/app/beer-store/services/beer-provider.service';

@Component({
  selector: 'common-library-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private beerProvider:BeerProviderService) { }

  canSearch: boolean;
  searchTextValue = "";
  private routeSubscription: Subscription = null;

  ngOnInit() {
    this.routeSubscription = this.router.events
      .pipe(
        filter(e => e instanceof NavigationStart)
      )
      .subscribe((r:NavigationStart) => {
        this.canSearch = r.url === "/";

        if (!this.canSearch) {
          this.searchTextValue="";
        }
      });
  }

  ngOnDestroy() {
    if (this.routeSubscription)
      this.routeSubscription.unsubscribe();
  }

  private timeoutHandle = null;
  onTextChange() {
    if (!!this.timeoutHandle)
      clearTimeout(this.timeoutHandle);

    this.timeoutHandle = setTimeout(() => {
      this.beerProvider.searchText.next(this.searchTextValue);
    }, 300);
  }
}
