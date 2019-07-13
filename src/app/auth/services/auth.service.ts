import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnauthenticatedUser } from '../models/unauthenticated-user.model';
import { tap, last } from 'rxjs/operators';
import { JwtResponse } from '../models/jwt-response.model';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = `/auth`;

  constructor(private http: HttpClient) {}

  loginUser(user: UnauthenticatedUser) {
    return this.http.post<JwtResponse>(`${this.authUrl}/login`, user).pipe(
      tap(
        (jwtResponse: JwtResponse) => {
          this.setSession(jwtResponse);
        },
        error => {
          throw error;
        }
      )
    );
  }

  createUser(user: User) {
    return this.http.post<JwtResponse>(`${this.authUrl}/register`, user).pipe(
      tap(
        (jwtResponse: JwtResponse) => {
          this.setSession(jwtResponse);
        },
        error => {
          throw error;
        }
      )
    );
  }

  logoutUser() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('user_id');
  }

  get loggedIn(): boolean {
    if (new Date() < this.expiration) {
      return true;
    } else {
      this.logoutUser();
      return false;
    }
  }

  get loggedOut(): boolean {
    return !this.loggedIn;
  }

  get fullName(): string {
    const firstName = localStorage.getItem('first_name');
    const lastName = localStorage.getItem('last_name');
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    return null;
  }

  get userId(): number {
    return parseInt(localStorage.getItem('user_id'), 10);
  }

  private setSession(jwtResponse: JwtResponse) {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + jwtResponse.expiresIn);
    localStorage.setItem('access_token', jwtResponse.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('first_name', jwtResponse.user.firstName.toString());
    localStorage.setItem('last_name', jwtResponse.user.lastName.toString());
    localStorage.setItem('user_id', jwtResponse.user.id.toString());
  }

  private get expiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return new Date(expiresAt);
  }
}
