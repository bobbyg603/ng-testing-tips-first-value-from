import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AffirmationClient } from 'affirmation';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AffirmationsComponent } from './affirmations/affirmations.component';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    AffirmationsComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [
    { provide: AffirmationClient, useValue: new AffirmationClient('http://localhost:3000') }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
