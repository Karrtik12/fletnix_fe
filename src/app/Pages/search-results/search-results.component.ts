import { Component } from '@angular/core';
import { TitleDetailModel } from '../../Models/title';
import { ActivatedRoute } from '@angular/router';
import { TitlesService } from '../../Services/titles.service';
import { TitleCardComponent } from '../../Elements/title-card/title-card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [TitleCardComponent, NgIf, NgFor],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  query: string = "";
  titleList: TitleDetailModel[]= [];
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private titlesService: TitlesService) {}

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
