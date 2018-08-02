import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhotoComponent } from './photo/photo.component';
import { VerseComponent } from './verse/verse.component';
import { MusicComponent } from './music/music.component';
import { TextComponent } from './text/text.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoComponent,
    VerseComponent,
    MusicComponent,
    TextComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
