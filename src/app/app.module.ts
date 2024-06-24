import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { CounterControlsComponent } from './components/counter-controls/counter-controls.component';
import { CounterOutputComponent } from './components/counter-output/counter-output.component';
import { CounterEffects } from './store/counter.effects';
import { counterReducer } from './store/counter.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CounterControlsComponent,
    CounterOutputComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    StoreModule.forRoot({
      counter: counterReducer,
    }),
    EffectsModule.forRoot([CounterEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
