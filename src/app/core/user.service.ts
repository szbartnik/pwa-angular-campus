import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly afsUserIdStorageKey = 'afsUserId';

  public get userId(): string {
    if (!this._userId) {
      this.regenerateUserId();
    }
    return this._userId;
  }
  private _userId: string;

  constructor(
    private afs: AngularFirestore
  ) {
    this.afs.firestore.settings({ timestampsInSnapshots: true });
    this.afs.firestore.enablePersistence();
    this.initializeUserId();
  }

  public regenerateUserId(): void {
    this._userId = this.afs.createId();
    localStorage.setItem(this.afsUserIdStorageKey, this._userId);
  }

  private initializeUserId(): void {
    const afsUserId = localStorage.getItem(this.afsUserIdStorageKey);
    this._userId = afsUserId;
  }
}
