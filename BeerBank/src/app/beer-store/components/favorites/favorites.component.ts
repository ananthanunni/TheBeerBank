import { Component, OnInit } from '@angular/core';
import { BeerProviderService } from '../../services/beer-provider.service';
import { Beer } from '../../models/Beer';
import { staggeredFadeAnimation } from 'src/app/common-library/animations/Animations';

@Component({
  selector: 'beer-store-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  animations:[staggeredFadeAnimation]
})
export class FavoritesComponent implements OnInit {

  constructor(private beerProvider:BeerProviderService) { }

  beerCollection:Beer[]=[];

  ngOnInit() {
    this.beerCollection=this.beerProvider.favoriteBeerCollection;
  }

  onFavoriteChanged(item:Beer){
    this.beerProvider.removeFavorite(item);
  }
}
