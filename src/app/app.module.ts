import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { PhotoComponent } from './photo/photo.component';
import { VerseComponent } from './verse/verse.component';
import { MusicComponent } from './music/music.component';
import { TextComponent } from './text/text.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ServiceWorkerModule } from '@angular/service-worker';

export const routes: Routes = [
  { path: '', component: TimelineComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'timeline/:id', component: TimelineComponent },
  { path: 'verse', component: VerseComponent },
  { path: 'verse/:book/:chapter/:verse', component: VerseComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		PhotoComponent,
		VerseComponent,
		MusicComponent,
		TextComponent,
		TimelineComponent
	],
	imports: [
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireStorageModule,
		AngularFireAuthModule,
		BrowserModule,
		BrowserAnimationsModule,
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
		MatCardModule,
		MatBottomSheetModule,
		MatToolbarModule,
		MatIconModule,
		MatListModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    HttpClientJsonpModule,
    JsonpModule,
    MatSelectModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
