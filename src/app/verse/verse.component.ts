import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ServiceService } from '../service.service';
import { Chapter } from '../interfaces';

@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss']
})
export class VerseComponent implements OnInit {
  passage$: Observable<Chapter>;
  chapters: string[] = [];
  book: any;

  constructor(public service: ServiceService) { }

  ngOnInit() {
    for (let i = 1; i <= 150; i++) {
      this.chapters.push(i.toString());
    }
    this.passage$ = this.service.getPassage('Psalms', 103);
  }

  read(e) {
    this.getPassage(e.value);
  }

  getPassage(chapter) {
    
  }

}
