import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, RouterModule.forChild(ROUTES)],
  declarations: [LoginComponent, RegisterComponent, AuthFormComponent]
})
export class AuthModule {}
