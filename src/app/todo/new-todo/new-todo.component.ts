import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.css',
})
export class NewTodoComponent {
  @Output() addTodo = new EventEmitter<Todo>();
  title: string;
  desc: string;
  onSubmit() {
    this.addTodo.emit(new Todo(0, this.title, this.desc, true));
    this.title="";
    this.desc="";
  }
}
