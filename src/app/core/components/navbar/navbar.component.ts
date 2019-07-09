import { Component } from '@angular/core';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  faSignOutAlt = faSignOutAlt;
  faUser = faUser;

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
