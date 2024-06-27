import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit, OnDestroy {
  @Input({ required: true }) user!: User;
  tasks!: Task[];
  isAdding: boolean = false;
  tasksSub: Subscription;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksSub = this.tasksService.updatedTasks.subscribe(
      (tasks) => (this.tasks = tasks)
    );
  }
  ngOnDestroy(): void {
    this.tasksSub.unsubscribe();
  }

  get userTasks() {
    return this.tasksService.getUserTasks(this.user);
  }

  closeDialog() {
    this.isAdding = false;
  }

  onAdd() {
    this.isAdding = true;
  }
}
