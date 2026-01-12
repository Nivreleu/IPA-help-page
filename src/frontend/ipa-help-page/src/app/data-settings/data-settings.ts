import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-data-settings',
  imports: [
    FormsModule
  ],
  templateUrl: './data-settings.html',
  styleUrl: './data-settings.scss',
})
export class DataSettings {

  model = {
    lastName: '',
    firstName: '',
    topic: '',
    dueDate: '' // yyyy-mm-dd
  };

  isSaving = signal(false);
  showSuccess = signal(false);
  private successTimer?: number;

  savePersonData() {
    if (this.isSaving()) return;

    this.isSaving.set(true);

    try {
      this.showSuccess.set(true);

      if (this.successTimer) window.clearTimeout(this.successTimer);
      this.successTimer = window.setTimeout(() => {
        this.showSuccess.set(false);
      }, 2000);
    } finally {
      this.isSaving.set(false);
    }
  }
}
