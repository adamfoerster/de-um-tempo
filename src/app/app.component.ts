import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('menu') menu: TemplateRef<any>;

  constructor(
    private bottomSheet: MatBottomSheet,
    public service: ServiceService,
    private router: Router,
    private swUpdate: SwUpdate,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.swUpdate.available.subscribe(_ => {
      let snackBarRef = this.snackBar
        .open('Newer version of the app is available', 'Refresh');
      snackBarRef.onAction().subscribe(() => {
        window.location.reload();
      });
    });
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(_ => {
        if (this.service.sheet) this.service.sheet.dismiss();
      });
  }

  openMenu() {
    this.service.sheet = this.bottomSheet.open(this.menu);
  }
}
