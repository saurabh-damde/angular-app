import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuth: boolean = false;

  constructor(
    private dsService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      (user) => (this.isAuth = !!user)
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  fetchData() {
    this.dsService.fetchRecipes().subscribe();
  }

  saveData() {
    this.dsService.storeRecipes();
  }

  onLogout() {
    this.authService.logOut();
  }
}
