import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('menu') menu: TemplateRef<any>;

  constructor(private bottomSheet: MatBottomSheet) {}

  openMenu() {
    this.bottomSheet.open(this.menu);
  }
}
