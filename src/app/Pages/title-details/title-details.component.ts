import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgIf} from '@angular/common'
import { TitlesService } from '../../Services/titles.service';
import { TitleDetailModel } from '../../Models/title';
import { LoadingBarComponent } from "../../Elements/loading-bar/loading-bar.component";

@Component({
  selector: 'app-title-detail',
  templateUrl: './title-details.component.html',
  imports: [NgIf, LoadingBarComponent],
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
}
