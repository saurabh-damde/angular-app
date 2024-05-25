import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { appRoutes } from './AppRoutes';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { TaskItemComponent } from './components/tasks/task-item/task-item.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TasksComponent,
    TaskItemComponent,
    AddTaskComponent,
    AboutComponent,
    FooterComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
