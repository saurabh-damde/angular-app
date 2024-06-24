import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { decrement, increment, init, set } from './counter.actions';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  constructor(private store: Store, private actions$: Actions) {}

  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const count = localStorage.getItem('count');
        if (count) {
          return of(set({ value: +count }));
        }
        return of(set({ value: 0 }));
      })
    )
  );

  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, counter]) => {
          console.log(action, counter);
          localStorage.setItem('count', counter.toString());
        })
      ),
    { dispatch: false }
  );
}
