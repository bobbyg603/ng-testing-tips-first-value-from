import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { firstValueFrom, of, skip } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AffirmationsComponent } from './affirmations.component';
import { AffirmationsService } from './affirmations.service';

describe('AffirmationsComponent', () => {
  let component: AffirmationsComponent;
  let fixture: ComponentFixture<AffirmationsComponent>;

  const affirmation = 'Don\'t worry, be happy!';
  let affirmationService: any;

  beforeEach(async () => {
    affirmationService = jasmine.createSpyObj('AffirmationService', ['getAffirmation']);
    affirmationService.getAffirmation.and.returnValue(of(affirmation));

    await TestBed.configureTestingModule({
      declarations: [
        AffirmationsComponent,
        SpinnerComponent
      ],
      providers: [
        { provide: AffirmationsService, useValue: affirmationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AffirmationsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('affirmation$', () => {
    it('should start with \'Loading...\'', () => 
      expectAsync(firstValueFrom(component.affirmation$)).toBeResolvedTo('Loading...')
    );

    it('should call getAffirmation', async () => {
      const resultPromise = firstValueFrom(component.affirmation$.pipe(skip(1)));

      await resultPromise;

      expect(affirmationService.getAffirmation).toHaveBeenCalled();
    });

    describe('tick', () => {
      it('should return the affirmation', fakeAsync(async () => {
        const resultPromise = firstValueFrom(component.affirmation$.pipe(skip(1)));
  
        tick(1000);
        const result = await resultPromise;
  
        expect(result).toEqual(affirmation);
      }));
    });

  });

  describe('loading$', () => {
    it('should start with true', () => 
      expectAsync(firstValueFrom(component.loading$)).toBeResolvedTo(true)
    );
  });
});
