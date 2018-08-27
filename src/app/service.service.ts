import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Jsonp } from '@angular/http';
import { MatBottomSheetRef } from '@angular/material';

import { Meeting, Book, Chapter, BookListItem } from './interfaces';
import { environment as env } from '../environments/environment';
import { Logs } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  meeting$: Observable<Meeting[]>;
  loading: string[] = [];
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
    this.meeting$ = this.db
      .collection<Meeting>('meetings', ref => ref.orderBy('id', 'desc'))
      .valueChanges();
  }

  fetchBook(bookName: string): Observable<Book> {
    return this.http.jsonp(`${env.bible.host}${bookName}`, 'getbible').pipe(
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
    if (this.user) {
      const bookName = book.book_name.replace(/\s/g, '');
      this.db.collection('books').doc(bookName).set(book);
    }
  }

  getBook(bookName): Observable<Book> {
    return this.db.collection('books').doc<Book>(bookName).valueChanges();
  }

  getPassage(book_name: string, chapter_nr: number): Observable<Chapter> {
    return this.getBook(book_name).pipe(
      switchMap(book => {
        if (!book) {
          return this.fetchFromAPI(`${book_name}`)
            .pipe(
              tap(bookFromAPI => this.saveBookToFireStore(bookFromAPI)),
              map(bookFromAPI => this.findChapter(bookFromAPI.book, chapter_nr))
            );
        }
        const chapters: Chapter[] = book.book as Chapter[];
        const found: Chapter = this.findChapter(chapters, chapter_nr);
        return of(found);
      })
    );
  }

  findChapter(chapters: Chapter[], chapter_nr: number): Chapter {
    return chapters
      .find(chapter => chapter.chapter_nr === chapter_nr);
  }

  getBooks(): BookListItem[] {
    return [
      {id: 'Genesis', name: 'Genesis'},
      {id: 'Exodus', name: 'Êxodo'},
      {id: 'Numbers', name: 'Número'},
      {id: 'Leviticus', name: 'Levítico'},
      {id: 'Deutoronomy', name: 'Deutoronômio'},
      {id: 'Psalms', name: 'Salmos'},
      {id: 'Proverbs', name: 'Provérbios'},
      {id: 'Matthew', name: 'Mateus'},
      {id: 'Mark', name: 'Marcos'},
      {id: 'Luke', name: 'Lucas'},
      {id: 'John', name: 'João'},
      {id: 'Acts', name: 'Atos'},
      {id: 'Romans', name: 'Romanos'},
      {id: '1Corinthians', name: '1a Coríntios'},
      {id: '2Corinthians', name: '2a Coríntios'},
      {id: 'Galatians', name: 'Gálatas'},
      {id: 'Ephesians', name: 'Efésios'},
      {id: 'Philippians', name: 'Filipenses'},
      {id: 'Colossians', name: 'Colossenses'},
      {id: '1Timothy', name: '1a Timóteo'},
      {id: '2Timothy', name: '2a Timóteo'},
      {id: 'Titus', name: 'Tito'},
      {id: 'Philemon', name: 'Filemon'},
      {id: 'James', name: 'Tiago'},
      {id: '1Peter', name: '1a Pedro'},
      {id: '2Peter', name: '2a Pedro'},
      {id: '1John', name: '1a João'},
      {id: '2John', name: '2a João'},
      {id: '3John', name: '3a João'},
      {id: 'Jude', name: 'Judas'},
      {id: 'Revelation', name: 'Apocalipse'},
    ];
  }

  fetchFromAPI(bookName: string): Observable<Book> {
    return this.http.jsonp<Book>(`${env.bible.host}${bookName}`, 'getbible')
      .pipe(map(book => this.mapResponseToBook(book)));
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
