import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

import IMessage from '../models/messages.modal';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private db: AngularFireDatabase) {}

  addMessage(data: IMessage) {
    return this.db.list('/Messages/').push(data);
  }

  getAllMessages() {
    return this.db
      .list('Messages')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((obj) => ({
            key: obj.payload.key,
            ...obj.payload.exportVal(),
          }))
        )
      );
  }

  deleteMessageByKey(key: string) {
    return this.db.object('/Messages/' + key).remove();
  }
}
