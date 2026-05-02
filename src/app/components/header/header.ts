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

  isDark = false;

  constructor(
    public auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.isDark = true;
      document.body.classList.add('dark-mode');
    } else {
      this.isDark = false;
      document.body.classList.remove('dark-mode');
  }
}

  toggleTheme() {
    this.isDark = !this.isDark;
    
    document.body.classList.toggle('dark-mode');

    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}