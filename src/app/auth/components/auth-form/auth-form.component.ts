import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import {
  faEnvelope,
  faCheck,
  faExclamationTriangle,
  faLock,
  faUser
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input()
  type: string;

  @Output()
  submitted = new EventEmitter<any>();

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  faEnvelope = faEnvelope;
  faCheck = faCheck;
  faExclamationTriangle = faExclamationTriangle;
  faLock = faLock;
  faUser = faUser;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.isRegistering) {
      this.form.addControl('firstName', new FormControl('', Validators.required));
      this.form.addControl('lastName', new FormControl('', Validators.required));
      // TODO: add confirm password
    }
  }

  submit() {
    if (this.formValid) {
      this.submitted.emit(this.form.value);
    }
  }

  get isRegistering() {
    return this.type === 'registering';
  }

  get formValid() {
    return this.form.valid;
  }

  get emailFormatInvalid() {
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }

  fieldRequired(field) {
    const control = this.form.get(field);
    return control.hasError('required') && control.touched;
  }

  fieldValid(field) {
    return this.form.get(field).valid;
  }

  fieldInvalid(field) {
    return this.form.get(field).invalid;
  }
}
