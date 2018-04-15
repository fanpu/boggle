import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { FoundWordsComponent } from './found-words/found-words.component';
import { LabelDirective } from './label.directive';
import { LabelScorePipe } from './label-score.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    FoundWordsComponent,
    LabelDirective,
    LabelScorePipe,
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
