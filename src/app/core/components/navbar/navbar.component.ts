import { Component } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  faSignOutAlt = faSignOutAlt;

  constructor(private authService: AuthService, private router: Router) {}

  get name() {
    return this.authService.fullName;
  }

  get loggedIn() {
    return this.authService.loggedIn;
  }

  logOut() {
    this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }
}
