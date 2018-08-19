import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Jsonp } from '@angular/http';
import { MatBottomSheetRef } from '@angular/material';

import { Meeting, Book, Chapter } from './interfaces';
import { environment as env } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  meeting$: Observable<Meeting[]>;
  private _sheet: MatBottomSheetRef;

  get sheet() {
    return this._sheet;
  }

  set sheet(ref: MatBottomSheetRef) {
    this._sheet = ref;
  }

  get user() {
    return this.afAuth.user;
  }

  constructor(
    private db: AngularFirestore,
    private http: HttpClient,
    private jsonp: Jsonp,
    public afAuth: AngularFireAuth,
  ) {
    this.meeting$ = this.db.collection<Meeting>('meetings').valueChanges();
  }

  fetchBook(book: string): Observable<Book> {
    return this.http.jsonp(`${env.bible.host}${book}`, 'getbible').pipe(
      map(book => this.mapResponseToBook(book)),
      tap((book: Book) => this.saveBookToFireStore(book))
    );
  }

  mapResponseToBook(response): Book {
    return {
      ...response,
      book: Object.keys(response['book']).map(chapter => {
        return this.mapBookToChapters(response['book'][chapter]);
      })
    };
  }

  mapBookToChapters(chapter) {
    return {
      ...chapter,
      chapter: Object.keys(chapter.chapter).map(verse => {
        return chapter.chapter[verse];
      })
    };
  }

  saveBookToFireStore(book: Book) {
    this.db.collection('ads').doc('ads').set({ads:1});
    if (this.user) {
      this.db.collection('books').doc(book.book_name).set(book);
    }
  }

  getBook(book_name): Observable<Book> {
    return this.db.collection('books').doc<Book>(book_name).valueChanges();
  }

  getPassage(book_name: string, chapter_nr: number): Observable<Chapter> {
    return this.getBook(book_name).pipe(
      map(book => book.book.find(chapter => chapter.chapter_nr === chapter_nr))
    );
  }

  getBooks() {
    return [
      {id: 'Genesis', name: 'Genesis'},
      {id: 'Exodus', name: 'Êxodo'},
      {id: 'Numbers', name: 'Número'},
      {id: 'Leviticus', name: 'Levítico'},
      {id: 'Deutoronomy', name: 'Deutoronômio'},
    ];
  }

  fetchPassage(passage: string) {
    return this.http.jsonp(`${env.bible.host}${passage}`, 'getbible');
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
