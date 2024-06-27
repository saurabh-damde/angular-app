import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from './models/task.model';
import { User } from './models/user.model';
import { TasksService } from './services/tasks.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  users!: User[];
  tasks!: Task[];
  selectedUser!: User;
  userTasks!: Task[];
  tasksSub: Subscription;

  constructor(
    private tasksService: TasksService,
    private usersService: UsersService
  ) {}
  ngOnInit(): void {
    this.users = this.usersService.allUsers;
    this.tasks = this.tasksService.allTasks;
  }
  ngOnDestroy(): void {}

  onUserSelect(user: User) {
    this.selectedUser = user;
    this.userTasks = this.tasksService.getUserTasks(user);
  }
}
