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
  constructor(public service: ServiceService) { }

  ngOnInit() {
    this.passage$ = this.service.fetchPassage('Psalms103').pipe(
      filter(p => !!p),
      map((p:any[]) => {
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
