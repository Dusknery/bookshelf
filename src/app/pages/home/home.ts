import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  isLogin = true;

  email = '';
  password = '';
  confirmPassword = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private auth: Auth,
    private router: Router,
  ) { }

  login() {

    this.errorMessage = '';
    this.successMessage = '';

    this.auth.login({
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['booklist']);
      },
      error: () => {
        this.errorMessage = 'Please enter valid email and password';
      }
    });
  }

  register() {
    this.successMessage = '';
    this.errorMessage = '';


    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Please fill in all fields to register';
      return;
    }

    this.auth.register({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.successMessage = 'Account created successfully.';

        this.isLogin = true;

        this.email = '';
        this.password = '';
        this.confirmPassword ='';
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Registration failed';
      }
    });
  }

  toggle() {
    this.isLogin = !this.isLogin;
    this.email = '';
    this.password = '';
    this.confirmPassword ='';
    this.errorMessage = '';
    this.successMessage = '';
  }

}
