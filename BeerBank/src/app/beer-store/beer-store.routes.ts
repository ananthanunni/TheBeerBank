import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';

export const BeerStoreRoutes: Routes = [
    { path: "", component: IndexComponent },
    { path: "favorites", component: FavoritesComponent },
    { path: "advancedsearch", component: AdvancedSearchComponent }
]