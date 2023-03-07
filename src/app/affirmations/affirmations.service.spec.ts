import { TestBed } from '@angular/core/testing';
import { AffirmationClient } from 'affirmation';
import { firstValueFrom } from 'rxjs';
import { AffirmationsService } from './affirmations.service';

describe('AffirmationsService', () => {
  let service: AffirmationsService;

  const affirmation = 'You are awesome!';
  let affirmationClient;

  beforeEach(() => {
    affirmationClient = jasmine.createSpyObj('AffirmationClient', ['get']);
    affirmationClient.get.and.resolveTo({ affirmation });

    TestBed.configureTestingModule({
      providers: [
        { provide: AffirmationClient, useValue: affirmationClient }
      ]
    });
    service = TestBed.inject(AffirmationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get an affirmation', async () => 
    expectAsync(firstValueFrom(service.getAffirmation()))
      .toBeResolvedTo(affirmation)
  );
});
