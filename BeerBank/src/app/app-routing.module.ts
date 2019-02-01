import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const AppRoutes: Routes = [
  {path:"", loadChildren:"./beer-store/beer-store.module#BeerStoreModule"}
];