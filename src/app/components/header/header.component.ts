import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'Task Tracker';
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((val) => (this.showAddTask = val));
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }
}
