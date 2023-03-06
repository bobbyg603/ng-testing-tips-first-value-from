import { TestBed } from '@angular/core/testing';
import { AffirmationClient } from 'affirmation';
import { firstValueFrom } from 'rxjs';
import { AffirmationService } from './affirmations.service';

describe('AffirmationService', () => {
  let service: AffirmationService;

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
    service = TestBed.inject(AffirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // This test doesn't run the expectation because from(Promise.resolve({ affirmation })) emits asynchronously
  xit('should get an affirmation', () => {
    service.getAffirmation().subscribe(result => {
      console.log('this ran after the test ended!');
      expect(result).toEqual(affirmation);
    });
  });

  it('should get an affirmation', async () => {
    return expectAsync(firstValueFrom(service.getAffirmation())).toBeResolvedTo(affirmation);
  });
});
