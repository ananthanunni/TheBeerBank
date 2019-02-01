import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { RouterModule } from '@angular/router';
import { BeerStoreRoutes } from './beer-store.routes';
import { BeerCardComponent } from './components/beer-card/beer-card.component';
import { AppMaterialModule } from '../app-material.module';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { BeerDetailsComponent } from './components/beer-details/beer-details.component';

@NgModule({
  declarations: [IndexComponent, BeerCardComponent, FavoritesComponent, BeerDetailsComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule.forChild(BeerStoreRoutes)
  ],
  entryComponents: [BeerDetailsComponent]
})
export class BeerStoreModule { }
