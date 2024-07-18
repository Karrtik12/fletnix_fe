import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgIf, NgFor} from '@angular/common'
import { TitlesService } from '../../Services/titles.service';
import { TitleDetailModel } from '../../Models/title';
import { LoadingBarComponent } from "../../Elements/loading-bar/loading-bar.component";

@Component({
  selector: 'app-title-detail',
  templateUrl: './title-details.component.html',
  imports: [NgIf, NgFor, LoadingBarComponent],
  standalone:true,  
  styleUrls: ['./title-details.component.css']
})
export class TitleDetailsComponent implements OnInit {
  title: TitleDetailModel | null = null;
  loading:boolean = false;
  titleService =inject(TitlesService)

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading=true;
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.titleService.getTitleById(id).subscribe(title => {
        this.title = title;
      });
    });
    setTimeout(()=>{
      this.loading= false;},1000);  
  }
  convertToHoursOrSeason(input: string) {
    const minuteRegex = /^(\d+) min$/;
  
    const minuteMatch = input.match(minuteRegex);
  
    if (minuteMatch) {
      const minutes = parseInt(minuteMatch[1], 10);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    let result = '';
    if (hours > 0) {
      result += `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (remainingMinutes > 0) {
      if (hours > 0) {
        result += ' ';
      }
      result += `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
    }
    return result;
  } else  {
      return input;
    } 
  }
}
