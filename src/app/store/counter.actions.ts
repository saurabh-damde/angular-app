import { createAction, props } from '@ngrx/store';
import { counterActions } from '../utils/constants';

export const init = createAction(counterActions.INIT);

export const set = createAction(counterActions.SET, props<{ value: number }>());

export const increment = createAction(
  counterActions.INCREMENT,
  props<{ value: number }>()
);

export const decrement = createAction(
  counterActions.DECREMENT,
  props<{ value: number }>()
);
