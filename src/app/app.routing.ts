import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'about', component: AboutComponent },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
