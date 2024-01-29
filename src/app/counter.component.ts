import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterStore } from './counter-store';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p></p>
    <h1>Counter</h1>
    <p>Count: {{ store.count() }}</p>
    <div>
      <button (click)="store.decrement()">Decrement</button>
      <button (click)="store.increment()">Increment</button>
    </div>
    <div>
      <button [disabled]="store.by() === 1" (click)="store.setCountBy(1)">
        Count by 1
      </button>

      <button [disabled]="store.by() === 3" (click)="store.setCountBy(3)">
        Count by 3
      </button>

      <button [disabled]="store.by() === 5" (click)="store.setCountBy(5)">
        Count by 5
      </button>
    </div>
  `,
  styles: ``,
})
export class CounterComponent {
  store = inject(CounterStore);
}
