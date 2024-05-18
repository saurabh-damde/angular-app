import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css',
})
export class CockpitComponent {
  @Output() serverCreated = new EventEmitter<{
    name: string;
    content: string;
  }>();
  @Output() blueprintCreated = new EventEmitter<{
    name: string;
    content: string;
  }>();

  @ViewChild('serverName') serverName: ElementRef;
  @ViewChild('serverContent') serverContent: ElementRef;

  onAddServer() {
    this.serverCreated.emit({
      name: this.serverName.nativeElement.value,
      content: this.serverContent.nativeElement.value,
    });
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({
      name: this.serverName.nativeElement.value,
      content: this.serverContent.nativeElement.value,
    });
  }
}
