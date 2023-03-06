import { Component, OnInit } from '@angular/core';
import { delay, map, merge, Observable, share, skip, startWith, Subject, switchMap } from 'rxjs';
import { AffirmationService } from './affirmations/affirmations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  affirmation$: Observable<string>;
  loading$: Observable<boolean>;
  private affirmationSubject: Subject<void>;

  constructor(private affirmationService: AffirmationService) {
    this.affirmationSubject = new Subject();
    
    this.affirmation$ = this.affirmationSubject
      .pipe(
        startWith('Loading...'),
        switchMap(() => this.affirmationService.getAffirmation()),
        delay(1000), // Simulate a slow network call
        share()
      );
    
    const startLoading$ = this.affirmationSubject.pipe(map(() => true));
    const stopLoading = this.affirmation$
      .pipe(
        skip(1),
        map(() => false)
      );
    this.loading$ = merge(startLoading$, stopLoading);
  }

  ngOnInit(): void {
    this.affirmationSubject.next();
  }

  onClick(): void {
    this.affirmationSubject.next();
  }
}
