import { Component, inject, NgModule } from '@angular/core';
import { TitleDetailModel } from '../../Models/title';
import { ActivatedRoute, Router } from '@angular/router';
import { TitlesService } from '../../Services/titles.service';
import { TitleCardComponent } from '../../Elements/title-card/title-card.component';
import { NgFor, NgIf } from '@angular/common';
import { LoadingBarComponent } from "../../Elements/loading-bar/loading-bar.component";
import { SearchQueryModel } from '../../Models/query';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [TitleCardComponent, NgIf, NgFor, LoadingBarComponent, MatRadioModule, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  searchQuery: SearchQueryModel = {
    q: '',
    type: "",
    page: 1
  }
  titleList: TitleDetailModel[] = [];
  pages: number[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  authService = inject(AuthService)
  loading: boolean = false;
  titlesService = inject(TitlesService);

  constructor(private route: ActivatedRoute, private router: Router) { }

  search() {
    this.loading = true;
    this.route.queryParams.subscribe(params => {
      this.searchQuery.q = params['q'];
      this.titlesService.searchTitles(this.searchQuery).subscribe(res => {
        console.log({ res })
        this.titleList = res.titles;
        this.totalPages = res.totalPages;
        this.currentPage = res.page;
        this.pages = [];
        for (let i = 2; i <= this.totalPages - 1; i++) this.pages.push(i);
      });
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });

  }
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.searchQuery.page = page;
      this.currentPage = this.searchQuery.page;
      this.search()
    }
  }

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
    this.search();
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
