import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TitleDetailModel } from '../../Models/title';
import {NgIf, NgFor} from '@angular/common'

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  standalone: true,
  imports:[NgIf, NgFor],
  styleUrls: ['./title-card.component.css']
})
export class TitleCardComponent {
  @Input() title!: TitleDetailModel;

  constructor(private router: Router) {}

  navigateToDetail(): void {
    this.router.navigate(['/title', this.title.show_id]);
  }

  truncate(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }
}
