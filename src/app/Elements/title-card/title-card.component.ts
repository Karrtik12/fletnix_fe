import { Component, Input } from '@angular/core';
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

  truncate(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }
}
