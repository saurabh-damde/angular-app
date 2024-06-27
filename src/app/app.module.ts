import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from './components/shared/shared.module';
import { TasksModule } from './components/tasks/tasks.module';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent],
  imports: [BrowserModule, SharedModule, TasksModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
