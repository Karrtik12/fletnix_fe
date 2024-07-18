import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TitlesService } from '../../Services/titles.service';
import { TitleDetailModel, TitleListModel } from '../../Models/title';
import { TitleCardComponent } from '../../Elements/title-card/title-card.component';
import { QueryModel } from '../../Models/query';
import { LoadingBarComponent } from '../../Elements/loading-bar/loading-bar.component';
import { MatRadioModule } from '@angular/material/radio';

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
  query: QueryModel = {
    page: 1,
    type: ""
  };
  totalPages: number = 0;
  currentPage: number = 0;
  titleService = inject(TitlesService);
  loading: boolean = false;

  ngOnInit(): void {
    this.getTitles();
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
    });
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  truncate(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }
}
