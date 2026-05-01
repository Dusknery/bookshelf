import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(
    public auth: Auth,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}