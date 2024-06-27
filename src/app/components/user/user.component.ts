import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input({ required: true }) user!: User;
  @Input({ required: true }) selected!: boolean;
  @Output() userSelected = new EventEmitter<User>();

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  onUserSelect() {
    this.userSelected.emit(this.user);
  }
}
