import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  error: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSrv: UserService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.error = "";

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email: string = this.loginForm.get('email')?.value ?? "";
    const password: string = this.loginForm.get('password')?.value ?? "";
    const user: User | null = this.userSrv.login(email, password);

    if (user != null) {
      this.router.navigateByUrl('tabs');
      return;
    }

    this.error = 'Error, credenciales incorrectas';
  }

}
