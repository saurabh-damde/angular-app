import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { NewTaskComponent } from './components/tasks/new-task/new-task.component';
import { CardComponent } from './components/shared/card/card.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent, TasksComponent, TaskComponent, NewTaskComponent, CardComponent],
  imports: [FormsModule, BrowserModule, StoreModule.forRoot({}, {})],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
