import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UnauthenticatedUser } from '../../models/unauthenticated-user.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  async loginUser(event: UnauthenticatedUser) {
    await this.authService
      .loginUser(event)
      .subscribe(res => this.router.navigate(['/']), err => (this.error = err.error.message));
  }
}
