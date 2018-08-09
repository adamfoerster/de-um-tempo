import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  constructor(public service: ServiceService) { }

  ngOnInit() {
    this.service.meeting$.subscribe(meeting => console.log(meeting));
  }

}
