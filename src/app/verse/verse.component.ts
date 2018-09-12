import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { ServiceService } from '../service.service';
import { Chapter, BookListItem, Verse } from '../interfaces';

@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss']
})
export class VerseComponent implements OnInit {
  passage$: Observable<Chapter>;
  chapter$: Observable<Chapter[]>;
  books: BookListItem[] = [];
  selectedChapter = 103;
  selectedVerses: Verse[] = [];
  selectedBook = 'Psalms';

  constructor(public service: ServiceService) { }

  ngOnInit() {
    this.read(this.selectedBook);
    this.books = this.service.getBooks();
  }

  read(bookName) {
    this.selectedBook = bookName;
    this.resetVerses();
    this.chapter$ = this.service.getBook(bookName)
      .pipe(map(book => book.book));
    this.passage$ = this.service.getChapter(bookName, this.selectedChapter);
  }

  select(verse) {
    if (this.isSelected(verse)) {
      this.selectedVerses = this.selectedVerses.filter(v => v.verse_nr !== verse);
    } else {
      this.service
        .getVerse(this.selectedBook, this.selectedChapter, verse)
        .pipe(first())
        .subscribe(vrs => this.selectedVerses.push(vrs));
    }
  }

  resetVerses() {
    this.selectedVerses = [];
  }

  isSelected(verse) {
    return !!this.selectedVerses.find(v => v.verse_nr === verse);
  }

  sendVerses() {
    this.service.sendVerses({
      reference: `${this.selectedBook} ${this.selectedChapter}`,
      verses: this.selectedVerses
    });
    this.resetVerses();
  }
}
