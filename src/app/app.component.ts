import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwPush } from '@angular/service-worker';
import { Observable } from 'rxjs/Observable';

import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { PersistenceService } from './core/persistence.service';
import { SnackBarOffilneComponent } from './snack-bar-offilne/snack-bar-offilne.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public name: string;
  public isConnected: Observable<boolean>;

  constructor(
    private persistenceService: PersistenceService,
    private swPush: SwPush,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.isConnected = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
  }

  ngOnInit(): void {
    this.isConnected.subscribe(
      isOnline => {
        if (isOnline === false) {
          this.openSnack();
        } else {
          this.snackBar.dismiss();
        }
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: { name: this.name }
    });
  }

  openSnack() {
    this.snackBar.openFromComponent(SnackBarOffilneComponent, {
      // duration: 500,
    });
  }
}
