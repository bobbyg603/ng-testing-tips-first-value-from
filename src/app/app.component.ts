import { Component } from '@angular/core';
import { BehaviorSubject, delay, map, merge, Observable, share, startWith, Subject, switchMap } from 'rxjs';
import { AffirmationService } from './affirmations/affirmations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  affirmation$: Observable<string>;
  loading$: Observable<boolean>;
  private affirmationSubject: Subject<void>;

  constructor(private affirmationService: AffirmationService) {
    this.affirmationSubject = new BehaviorSubject<void>(null as any);
    
    this.affirmation$ = this.affirmationSubject
      .pipe(
        switchMap(() => this.affirmationService.getAffirmation()),
        delay(1000), // Simulate a slow network call
        startWith('Loading...'),
        share(),
      );
    
    const startLoading$ = this.affirmationSubject.pipe(map(() => true));
    const stopLoading = this.affirmation$.pipe(map(() => false));
    this.loading$ = merge(startLoading$, stopLoading);
  }

  onClick(): void {
    this.affirmationSubject.next();
  }
}
