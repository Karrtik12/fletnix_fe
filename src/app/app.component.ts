import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './Services/auth.service';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, NgIf, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'FletNix';
  authService = inject(AuthService);

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (
      localStorage.getItem('loggedInUserEmail') !== undefined &&
      localStorage.getItem('loggedInUserEmail') !== null &&
      localStorage.getItem('loggedInUserEmail') !== 'undefined' &&
      localStorage.getItem('loggedInUserEmail') !== 'null' &&
      localStorage.getItem('loggedInUserEmail') !== ''
    ) {
      this.authService.loggedInUser.email =
        localStorage.getItem('loggedInUserEmail')!;
    }
    if (
      localStorage.getItem('loggedInUserAge') !== undefined &&
      localStorage.getItem('loggedInUserAge') !== null &&
      localStorage.getItem('loggedInUserAge') !== 'undefined' &&
      localStorage.getItem('loggedInUserAge') !== 'null' &&
      localStorage.getItem('loggedInUserAge') !== '0'
    ) {
      this.authService.loggedInUser.age = parseInt(
        localStorage.getItem('loggedInUserAge')!
      );
    }
    localStorage.setItem(
      'loggedInUserEmail',
      this.authService.loggedInUser.email
    );
    localStorage.setItem(
      'loggedInUserAge',
      this.authService.loggedInUser.age.toString()
    );
    if (this.authService.loggedInUser.email === '' || this.authService.loggedInUser.email === undefined || this.authService.loggedInUser.email === null || this.authService.loggedInUser.email === 'undefined' || this.authService.loggedInUser.email === 'null' || this.authService.loggedInUser.age === 0 || this.authService.loggedInUser.age === undefined || this.authService.loggedInUser.age === null) {
      this.navigateToLogin();
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.loggedInUser = {
      email: '',
      age: 0,
      message: 'Logged out successfully',
    };
    localStorage.setItem(
      'loggedInUserEmail',
      this.authService.loggedInUser.email
    );
    localStorage.setItem(
      'loggedInUserAge',
      this.authService.loggedInUser.age.toString()
    );
    this.navigateToLogin();
    alert(this.authService.loggedInUser.message);
  }

  onSearch(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      const query = inputElement.value.trim();
      if (query) {
        this.router.navigate(['/search'], { queryParams: { q: query } });
        inputElement.value = '';
      }
    }
  }
}
