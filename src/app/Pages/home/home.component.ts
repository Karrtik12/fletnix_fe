import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TitlesService } from '../../Services/titles.service';
import { TitleDetailModel, TitleListModel } from '../../Models/title';
import { TitleCardComponent } from '../../Elements/title-card/title-card.component';
import { QueryModel } from '../../Models/query';
import { LoadingBarComponent } from '../../Elements/loading-bar/loading-bar.component';
import { MatRadioModule } from '@angular/material/radio';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, TitleCardComponent, FormsModule, LoadingBarComponent, MatRadioModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  titleList: TitleDetailModel[] = [];
  currentType = "All";
  authService = inject(AuthService)
  query: QueryModel = {
    page: 1,
    type: ""
  };
  totalPages: number = 0;
  currentPage: number = 0;
  titleService = inject(TitlesService);
  loading: boolean = false;
  pages: number[] = [];

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
    this.getTitles();
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.query.page = page;
      this.currentPage = this.query.page;
      this.getTitles()
    }
  }

  applyFilter(): void {
    this.query.page = 1;
    this.currentPage = 1;
    this.getTitles();
  }

  getTitles() {
    this.loading = true;
    this.titleService.getAllTitles(this.query).subscribe((res: TitleListModel) => {
      this.titleList = res.titles;
      this.totalPages = res.totalPages;
      this.currentPage = res.page;
      this.pages = [];
      for (let i = 2; i <= this.totalPages - 1; i++) this.pages.push(i);
    });
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  truncate(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }
}
