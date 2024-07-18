import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TitleDetailModel } from '../../Models/title';
import { NgIf, NgFor } from '@angular/common'

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  standalone: true,
  imports: [NgIf, NgFor],
  styleUrls: ['./title-card.component.css']
})
export class TitleCardComponent {
  @Input() title!: TitleDetailModel;
  hover: boolean = false;

  constructor(private router: Router) { }

  navigateToDetail(): void {
    this.router.navigate(['/title', this.title.show_id]);
  }

  truncate(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
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
    } else {
      return input;
    }
  }
}
