import { Injectable } from '@angular/core';
import { AffirmationClient } from 'affirmation';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffirmationService {

  constructor(private affirmationClient: AffirmationClient) { }

  getAffirmation(): Observable<string> {
    return from(this.affirmationClient.get())
      .pipe(
        map(response => response.affirmation)
      );
  }
}
