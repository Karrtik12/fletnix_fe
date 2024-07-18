import { Component, inject, NgModule } from '@angular/core';
import { TitleDetailModel } from '../../Models/title';
import { ActivatedRoute } from '@angular/router';
import { TitlesService } from '../../Services/titles.service';
import { TitleCardComponent } from '../../Elements/title-card/title-card.component';
import { NgFor, NgIf } from '@angular/common';
import { LoadingBarComponent } from "../../Elements/loading-bar/loading-bar.component";
import { SearchQueryModel } from '../../Models/query';
import {  MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

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
    type: ""
  }
  titleList: TitleDetailModel[]= [];
  loading: boolean = false;
  titlesService = inject(TitlesService);

  constructor(private route: ActivatedRoute) {}

  search(){
    this.loading = true;
    this.route.queryParams.subscribe(params => {
      this.searchQuery.q = params['q'];
      this.titlesService.searchTitles(this.searchQuery).subscribe(res => {
        this.titleList = res.titles;      
      });
      setTimeout(()=>{
        this.loading= false;},1000);
    });

  }

  ngOnInit(): void {
    this.search();
  }
}
