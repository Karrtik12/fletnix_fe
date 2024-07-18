import { Component, inject } from '@angular/core';
import { TitleDetailModel } from '../../Models/title';
import { ActivatedRoute } from '@angular/router';
import { TitlesService } from '../../Services/titles.service';
import { TitleCardComponent } from '../../Elements/title-card/title-card.component';
import { NgFor, NgIf } from '@angular/common';
import { LoadingBarComponent } from "../../Elements/loading-bar/loading-bar.component";
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [TitleCardComponent, NgIf, NgFor, LoadingBarComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  query: string = "";
  titleList: TitleDetailModel[]= [];
  loading: boolean = false;
  titlesService = inject(TitlesService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.queryParams.subscribe(params => {
      this.query = params['q'];
      this.titlesService.searchTitles(this.query).subscribe(res => {
        this.titleList = res.titles;      
      });
      this.loading = false;
    });
  }
}
