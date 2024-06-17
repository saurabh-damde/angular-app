import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResData } from '../models/auth.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  err: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    let authObs: Observable<AuthResData>;
    if (authForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.logIn({ ...authForm.value });
    } else {
      authObs = this.authService.signUp({ ...authForm.value });
    }
    authObs.subscribe(
      (res) => this.router.navigate(['/recipes']),
      (err) => (this.err = err)
    );
    authForm.reset();
    this.isLoading = false;
  }
}
