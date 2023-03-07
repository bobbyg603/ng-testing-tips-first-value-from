import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  @Output() countChange = new EventEmitter<number>();

  count = 0;

  onCountChange(newCount: number): void {
    this.count = newCount;
    this.countChange.emit(this.count);
  }
}
