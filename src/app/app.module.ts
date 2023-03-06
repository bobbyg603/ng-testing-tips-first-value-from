import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AffirmationClient } from 'affirmation';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: AffirmationClient, useValue: new AffirmationClient('http://localhost:3000') }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
