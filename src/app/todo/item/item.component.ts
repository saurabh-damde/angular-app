import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  @Input() todo: Todo;
  @Output() removeTodo = new EventEmitter<Todo>();
  @Output() updateTodo = new EventEmitter<Todo>();

  onRemove(todo: Todo) {
    this.removeTodo.emit(todo);
  }
  onCheck(todo:Todo){
    todo.active = !todo.active;
    this.updateTodo.emit(todo);
  }
}
