import { ComponentFixture, TestBed } from '@angular/core/testing';
import { firstValueFrom, skip, take, toArray } from 'rxjs';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Outputs', () => {
    it('should emit updated count', async () => {
      const newCount = 3;
      const resultPromise = firstValueFrom(component.countChange);
      
      component.onCountChange(newCount);
      const result = await resultPromise;
    
      expect(result).toEqual(newCount);
    });
  })

  describe('skip', () => {
    it('should emit count each time onCountChange is called', async () => {
      const values = [1, 2];
      const firstResultPromise = firstValueFrom(component.countChange);
      const secondResultPromise = firstValueFrom(component.countChange.pipe(skip(1)));
    
      values.forEach(value => component.onCountChange(value));
      const firstResult = await firstResultPromise;
      const secondResult = await secondResultPromise;
    
      expect(firstResult).toEqual(values[0]);
      expect(secondResult).toEqual(values[1]);
    });
  });

  describe('take and toArray', () => {
    it('should emit count each time onCountChange is called', async () => {
      const values = [1, 2, 3];
      const resultPromise = firstValueFrom(
        component.countChange
          .pipe(
            take(values.length),
            toArray()
          )
      );
    
      values.forEach(value => component.onCountChange(value));
      const result = await resultPromise;
    
      expect(result).toEqual(jasmine.arrayContaining(values));
    });
  })
});
