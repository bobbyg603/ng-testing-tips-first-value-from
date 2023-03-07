import { Injectable } from '@angular/core';
import { AffirmationClient } from 'affirmation';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffirmationsService {

  constructor(private affirmationsClient: AffirmationClient) { }

  getAffirmation(): Observable<string> {
    return from(this.affirmationsClient.get())
      .pipe(
        map(response => response.affirmation)
      );
  }
}
