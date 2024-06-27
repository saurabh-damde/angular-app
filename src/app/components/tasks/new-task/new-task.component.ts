import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Output() close = new EventEmitter<void>();
  @Input() userId!: string;
  title: string = '';
  summary: string = '';
  dueDate: Date = new Date();

  constructor(private tasksService: TasksService) {}

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.tasksService.addTask({
      title: this.title,
      summary: this.summary,
      dueDate: this.dueDate,
      userId: this.userId,
    });
    this.onCancel();
  }
}
