import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { environment } from '../environments/environment';
import { AboutComponent } from './about/about.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CardPhotoDialogComponent } from './card-photo-dialog/card-photo-dialog.component';
import { CardsTableComponent } from './cards-table/cards-table.component';
import { CoreModule } from './core/core.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { SnackBarOffilneComponent } from './snack-bar-offilne/snack-bar-offilne.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    AddDialogComponent,
    CardsTableComponent,
    MainComponent,
    FavouritesComponent,
    AboutComponent,
    CardPhotoDialogComponent,
    SnackBarOffilneComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,

    CoreModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,

    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    MatSnackBarModule
  ],
  providers: [],
  entryComponents: [AddDialogComponent, CardPhotoDialogComponent, SnackBarOffilneComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
