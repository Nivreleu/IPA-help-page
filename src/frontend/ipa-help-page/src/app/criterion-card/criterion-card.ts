import {Component, Input, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-criterion-card',
  standalone: true,
  templateUrl: './criterion-card.html',
  styleUrl: './criterion-card.scss',
  imports: [
    FormsModule
  ]
})
export class CriterionCard {
  @Input() criterion: any;
  comment = '';
  showSuccess = signal(false);

  saveComment() {
    this.showSuccess.set(true);

    setTimeout(() => {
      this.showSuccess.set(false);
    }, 2000);
  }
}
