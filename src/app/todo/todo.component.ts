import { Component } from '@angular/core';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todos: Todo[];

  constructor() {
    const savedData = localStorage.getItem('todos');
    if (savedData) {
      this.todos = JSON.parse(savedData);
    } else {
      this.todos = [];
    }
  }

  generateUniqueSerial() {
    let found = false;
    let currentId: number;
    while (!found) {
      currentId = Math.floor(Math.random() * 100);
      found = !this.todos.find((item) => item.sr === currentId);
    }
    return currentId;
  }

  saveData() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  removeTodo(todo: Todo) {
    this.todos = this.todos.filter((item) => item.sr !== todo.sr);
    this.saveData();
  }

  addTodo(todo: Todo) {
    this.todos.push({ ...todo, sr: this.generateUniqueSerial() });
    this.saveData();
  }

  updateTodo(todo: Todo) {
    this.todos = this.todos.map((item) => {
      if (item.sr === todo.sr) {
        return { ...todo };
      } else {
        return item;
      }
    });
    this.saveData();
  }
}
