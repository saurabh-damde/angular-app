import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../../Task';
import { UiService } from '../../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  @Output() addTaskEvent = new EventEmitter<Task>();
  text: string;
  day: string;
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((val) => (this.showAddTask = val));
  }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task.');
      return;
    }

    const task: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.addTaskEvent.emit(task);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
