import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-data-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './data-settings.html',
  styleUrl: './data-settings.scss',
})
export class DataSettings implements OnInit {

  private route = inject(ActivatedRoute);

  username = toSignal(
    this.route.paramMap.pipe(map(p => p.get('username') ?? 'unknown')),
    { initialValue: 'unknown' }
  );

  model = {
    lastName: '',
    firstName: '',
    topic: '',
    dueDate: '' // yyyy-mm-dd
  };

  isSaving = signal(false);
  showSuccess = signal(false);
  private successTimer?: number;

  private personKey() {
    return `ipahelp:person:${this.username()}`;
  }

  ngOnInit() {
    this.loadPersonData();
  }

  private loadPersonData() {
    try {
      const raw = localStorage.getItem(this.personKey());
      if (!raw) return;

      const parsed = JSON.parse(raw) as Partial<typeof this.model>;

      this.model = {
        lastName: parsed.lastName ?? '',
        firstName: parsed.firstName ?? '',
        topic: parsed.topic ?? '',
        dueDate: parsed.dueDate ?? ''
      };
    } catch {
      // ignore
    }
  }

  savePersonData() {
    if (this.isSaving()) return;

    this.isSaving.set(true);

    try {
      // ✅ speichern
      localStorage.setItem(this.personKey(), JSON.stringify(this.model));

      // ✅ success feedback
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
