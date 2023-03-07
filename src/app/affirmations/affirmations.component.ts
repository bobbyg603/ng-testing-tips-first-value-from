import { Component } from '@angular/core';
import { Observable, Subject, BehaviorSubject, switchMap, delay, startWith, share, map, merge } from 'rxjs';
import { AffirmationsService } from './affirmations.service';

@Component({
  selector: 'app-affirmations',
  templateUrl: './affirmations.component.html',
  styleUrls: ['./affirmations.component.scss']
})
export class AffirmationsComponent {
  affirmation$: Observable<string>;
  loading$: Observable<boolean>;
  private affirmationSubject: Subject<void>;

  constructor(private affirmationService: AffirmationsService) {
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
