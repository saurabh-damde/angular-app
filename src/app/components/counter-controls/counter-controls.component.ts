import { Component } from '@angular/core';
import { CounterService } from '../../services/counter.service';
import { Store } from '@ngrx/store';
import { decrement, increment } from '../../store/counter.actions';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrl: './counter-controls.component.css',
})
export class CounterControlsComponent {
  constructor(private store: Store) {}

  increment() {
    this.store.dispatch(increment({ value: 5 }));
  }

  decrement() {
    this.store.dispatch(decrement({ value: 3 }));
  }
}
