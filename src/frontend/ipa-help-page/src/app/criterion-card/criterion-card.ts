import { Component, Input, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import {GradeService, Guetestufe} from '../service/grade-service';

@Component({
  selector: 'app-criterion-card',
  standalone: true,
  templateUrl: './criterion-card.html',
  styleUrl: './criterion-card.scss',
  imports: [FormsModule]
})
export class CriterionCard {
  @Input() criterion: any;

  comment = '';
  showSuccess = signal(false);

  private gradeService = inject(GradeService);
  private route = inject(ActivatedRoute);

  username = toSignal(
    this.route.paramMap.pipe(
      map(p => p.get('username') ?? 'unknown')
    ),
    { initialValue: 'unknown' }
  );

  /* ===============================
     GÜTESTUFE SPEICHERN
     =============================== */
  setGuetestufe(grade: Guetestufe) {
    if (!this.criterion?.id) return;

    this.gradeService.setGrade(
      this.username(),
      this.criterion.id,
      grade
    );
  }

  getGuetestufe(): Guetestufe | null {
    if (!this.criterion?.id) return null;

    return this.gradeService.getGrade(
      this.username(),
      this.criterion.id
    );
  }

  /* ===============================
     KOMMENTAR SPEICHERN
     =============================== */
  saveComment() {
    if (!this.criterion?.id) return;

    const key = `ipahelp:comment:${this.username()}:${this.criterion.id}`;

    localStorage.setItem(key, this.comment);

    this.showSuccess.set(true);
    setTimeout(() => this.showSuccess.set(false), 2000);
  }

  ngOnInit() {
    if (!this.criterion?.id) return;

    const key = `ipahelp:comment:${this.username()}:${this.criterion.id}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      this.comment = stored;
    }
  }
}
