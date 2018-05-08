import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from './user.service';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { RecordModel } from '../models/record.model';
import { DocumentReference } from '@firebase/firestore-types';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor(
    private userService: UserService,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private http: HttpClient
  ) { }

  public getRecordsOfCurrentUser(): Observable<RecordModel[]> {
    return this.afs
      .collection<RecordModel>(`users/${this.userService.userId}/records`)
      .valueChanges();
  }

  public addRecordToCurrentUser(record: RecordModel): Promise<void> {
    const id = this.afs.createId();
    record.id = id;

    return this.afs
      .doc<RecordModel>(`users/${this.userService.userId}/records/${id}`)
      .set(record);
  }

  public deleteRecordOfCurrentUser(recordId: string): Promise<void> {
    return this.afs
      .doc(`users/${this.userService.userId}/records/${recordId}`)
      .delete();
  }

  public subscribeNotification(subscriptionData: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/subscribe', subscriptionData);
  }

  public upload(event: any): AngularFireUploadTask {
    const randomId = Math.random().toString(36).substring(2);
    const ref = this.afStorage.ref(randomId);
    const task = ref.put(event.target.files[0]);
    return task;
  }
}
