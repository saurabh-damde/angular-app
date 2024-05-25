import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  appName = "Task Tracker"
  appVersion = 1.0;
  linkText = "Go Back"
}
