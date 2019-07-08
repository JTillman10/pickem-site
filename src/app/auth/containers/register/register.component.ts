import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  async registerUser(user: User) {
    await this.authService
      .createUser(user)
      .subscribe(res => this.router.navigate(['/']), err => (this.error = err.error.message));
  }
}
