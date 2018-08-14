import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ServiceService } from '../service.service';

@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.css']
})
export class VerseComponent implements OnInit {
  passage$: Observable<any>;
  chapters: string[] = [];

  constructor(public service: ServiceService) { }

  ngOnInit() {
    for (let i=1; i<=150; i++) {
      this.chapters.push(i.toString());
    }
    this.getPassage('103');
  }

  read(e) {
    this.getPassage(e.value);
  }

  getPassage(chapter) {
    this.passage$ = this.service.fetchPassage(`Psalms${chapter}`).pipe(
      filter(p => !!p),
      map((p: any[]) => {
        const verseNums: string[] = Object.keys(p['chapter']);
        let chapter: any[] = [];
        verseNums.forEach(verse => {
          chapter.push({
            verseNum: verse,
            text: p['chapter'][verse]['verse']
          });
        });
        return chapter;
      })
    );
  }

}
