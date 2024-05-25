import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../../Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input() task: Task;
  @Output() deleteEvent = new EventEmitter<Task>();
  @Output() toggleEvent = new EventEmitter<Task>();
  faTimes = faTimes;

  onDelete(task: Task) {
    this.deleteEvent.emit(task);
  }

  onToggle(task: Task) {
    this.toggleEvent.emit(task);
  }
}
