import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { RouterModule } from '@angular/router';
import { BeerStoreRoutes } from './beer-store.routes';
import { BeerCardComponent } from './components/beer-card/beer-card.component';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
  declarations: [IndexComponent, BeerCardComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule.forChild(BeerStoreRoutes)
  ]  
})
export class BeerStoreModule { }
