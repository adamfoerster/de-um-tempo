import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ServiceService } from '../service.service';
import { Chapter, BookListItem } from '../interfaces';

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
  selectedVerses: number[] = [];

  constructor(public service: ServiceService) { }

  ngOnInit() {
    this.read('Psalms');
    this.books = this.service.getBooks();
  }

  read(bookName) {
    this.chapter$ = this.service.getBook(bookName)
      .pipe(map(book => book.book));
    this.passage$ = this.service.getPassage(bookName, this.selectedChapter);
  }

  select(verse) {
    this.selectedVerses.push(verse);
  }

}
