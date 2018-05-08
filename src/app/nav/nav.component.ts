import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { PersistenceService } from 'src/app/core/persistence.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private breakpointObserver: BreakpointObserver,
    private persistenceService: PersistenceService,
    private swPush: SwPush) {}

  public subscribeToNotification(): void {
    this.swPush.requestSubscription({
      serverPublicKey: environment.notificationsPublicKey
    })
      .then(sub => {
        console.log('Successfully subscribed to notification');
        this.persistenceService.subscribeNotification(sub).subscribe(x => {
          console.log('Successfully persisted subscription');
        }, err => {
          console.error('Could not persist subscription');
        });
      }).catch(err => {
        console.error('Could not subscribe to notifications', err);
      });
  }
}
