import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-passages',
  templateUrl: './passages.component.html',
  styleUrls: ['./passages.component.css']
})
export class PassagesComponent implements OnInit {
  reference$: Observable<any>;

  constructor(public service: ServiceService) { }

  ngOnInit() {
    this.service.user
      .subscribe(user => this.reference$ = this.service.getReferencesFromUser(user.email));
  }

}
