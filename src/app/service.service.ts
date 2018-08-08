import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Meeting } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  meeting$: Observable<Meeting[]>;

  constructor(private db: AngularFirestore) {
    this.meeting$ = this.db.collection<Meeting>('meetings').valueChanges();
  }
}
