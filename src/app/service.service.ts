import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Jsonp } from '@angular/http';

import { Meeting } from './interfaces';
import { environment as env } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  meeting$: Observable<Meeting[]>;

  constructor(
    private db: AngularFirestore,
    private http: HttpClient,
    private jsonp: Jsonp
  ) {
    this.meeting$ = this.db.collection<Meeting>('meetings').valueChanges();
  }

  fetchBook(book: string) {
    let result = (response) => {console.log(response)};
    return this.http.jsonp(`${env.bible.host}${book}`, 'getbible');
  }

  fetchPassage(passage: string) {
    let result = (response) => {console.log(response)};
    return this.http.jsonp(`${env.bible.host}${passage}`, 'getbible');
  }
}
