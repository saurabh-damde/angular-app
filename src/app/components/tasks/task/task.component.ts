import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.model';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task!: Task;

  constructor(private tasksService: TasksService) {}

  onComplete() {
    this.tasksService.removeTask(this.task);
  }
}
