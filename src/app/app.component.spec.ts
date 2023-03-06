import { ComponentFixture, TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { AffirmationService } from './affirmations/affirmations.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const affirmation = 'Don\'t worry, be happy!';
  let affirmationService;

  let fixture: ComponentFixture<AppComponent>
  let app: AppComponent;
  
  beforeEach(async () => {
    affirmationService = jasmine.createSpyObj('AffirmationService', ['getAffirmation']);
    affirmationService.getAffirmation.and.returnValue(of(affirmation));
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AffirmationService, useValue: affirmationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  // This test runs the expectation because of(affirmation) emits a value synchronously
  xit('should emit affirmation', () => {
    app.affirmation$.subscribe(result => {
      console.log('this ran before the test ended!');
      expect(result).toEqual(affirmation);
    });
  })

  it('should emit affirmation', async () => {
    return expectAsync(firstValueFrom(app.affirmation$)).toBeResolvedTo(affirmation);
  });
});
