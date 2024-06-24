import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [FormsModule, BrowserModule, StoreModule.forRoot({}, {})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
