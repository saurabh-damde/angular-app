import { Injectable } from '@angular/core';
import { DUMMY_TASKS } from '../utils/dummy-tasks';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = DUMMY_TASKS;
  updatedTasks = new Subject<Task[]>();

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    } else {
      this.saveTasks();
    }
  }

  get uniqueId() {
    let id,
      isUnique = false;
    while (!isUnique) {
      id = Math.floor(Math.random() * 100);
      isUnique = !this.tasks.find((task) => task.id === id);
    }
    return id;
  }

  get allTasks() {
    this.updatedTasks.next(this.tasks.slice());
    return this.tasks.slice();
  }

  getUserTasks(user: User) {
    return this.tasks.filter((task) => task.userId === user.id);
  }

  addTask(task: Task) {
    task = { ...task, id: 't' + this.uniqueId };
    this.tasks.push(task);
    this.updatedTasks.next(this.tasks.slice());
    this.saveTasks();
  }

  removeTask(currTask: Task) {
    this.tasks = this.tasks.filter((task) => task.id !== currTask.id);
    this.updatedTasks.next(this.tasks.slice());
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
