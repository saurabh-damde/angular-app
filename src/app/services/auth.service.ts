import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthReqData, AuthResData } from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey = 'AIzaSyBl47KQ_-KP28088DluerSvAmNjoUZaD54';
  private signUpUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
    this.apiKey;
  private logInUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
    this.apiKey;

  user = new BehaviorSubject<User>(null);
  private tokenExpiryTimer: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const user = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (user.token) {
      this.user.next(user);
      const expiryTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expiryTime);
    }
  }

  autoLogout(expiryTime: number) {
    this.tokenExpiryTimer = setTimeout(() => this.logOut(), expiryTime);
  }

  signUp(data: AuthReqData) {
    return this.http
      .post<AuthResData>(this.signUpUrl, {
        ...data,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) =>
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          )
        )
      );
  }

  logIn(data: AuthReqData) {
    return this.http
      .post<AuthResData>(this.logInUrl, {
        ...data,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) =>
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          )
        )
      );
  }

  logOut() {
    if (this.tokenExpiryTimer) {
      clearTimeout(this.tokenExpiryTimer);
      this.tokenExpiryTimer = null;
    }
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expiry = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expiry);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errRes: HttpErrorResponse) {
    let errMsg = 'An unknown error occurred!';
    if (!errRes.error || !errRes.error.error) {
      return throwError(() => errMsg);
    }
    switch (errRes.error.error.message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        errMsg = 'The provided credentials are invalid.';
        break;
      case 'EMAIL_EXISTS':
        errMsg = 'The email address is already in use by another account.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errMsg =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
    }
    return throwError(() => errMsg);
  }
}
