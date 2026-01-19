import { Component, Input, signal, inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { GradeService, Guetestufe } from '../service/grade-service';

@Component({
  selector: 'app-criterion-card',
  standalone: true,
  templateUrl: './criterion-card.html',
  styleUrl: './criterion-card.scss',
  imports: [FormsModule]
})
export class CriterionCard implements OnChanges {
  @Input() criterion: any;

  comment = '';
  showSuccess = signal(false);

  // ✅ NEU: req.id -> true/false
  checkedReqs = signal<Record<string, boolean>>({});

  private gradeService = inject(GradeService);
  private route = inject(ActivatedRoute);

  username = toSignal(
    this.route.paramMap.pipe(
      map(p => p.get('username') ?? 'unknown')
    ),
    { initialValue: 'unknown' }
  );

  /* ===============================
     Keys (zentral)
     =============================== */
  private commentKey() {
    return `ipahelp:comment:${this.username()}:${this.criterion.id}`;
  }

  // ✅ NEU: Key für Checkboxen
  private reqsKey() {
    return `ipahelp:reqs:${this.username()}:${this.criterion.id}`;
  }

  /* ===============================
     Input-Lifecycle: laden wenn criterion da ist
     =============================== */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['criterion'] && this.criterion?.id) {
      this.loadComment();
      this.loadCheckedReqs();
    }
  }

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
     KOMMENTAR SPEICHERN / LADEN
     =============================== */
  saveComment() {
    if (!this.criterion?.id) return;

    localStorage.setItem(this.commentKey(), this.comment);

    this.showSuccess.set(true);
    setTimeout(() => this.showSuccess.set(false), 2000);
  }

  private loadComment() {
    const stored = localStorage.getItem(this.commentKey());
    this.comment = stored ?? '';
  }

  /* ===============================
     ✅ CHECKBOXEN SPEICHERN / LADEN
     =============================== */

  // Wird bei (change) der Checkbox aufgerufen
  toggleReq(reqId: string, checked: boolean) {
    const next = { ...this.checkedReqs() };
    next[String(reqId)] = checked;
    this.checkedReqs.set(next);

    // Speichern als Array der angehakten IDs
    const checkedIds = Object.entries(next)
      .filter(([, v]) => v)
      .map(([k]) => k);

    localStorage.setItem(this.reqsKey(), JSON.stringify(checkedIds));
  }

  // Für [checked] Binding im Template
  isReqChecked(reqId: string): boolean {
    return !!this.checkedReqs()[String(reqId)];
  }

  private loadCheckedReqs() {
    try {
      const raw = localStorage.getItem(this.reqsKey());
      const ids = raw ? (JSON.parse(raw) as string[]) : [];

      const mapObj: Record<string, boolean> = {};
      for (const id of ids) mapObj[String(id)] = true;

      this.checkedReqs.set(mapObj);
    } catch {
      this.checkedReqs.set({});
    }
  }

  protected readonly HTMLInputElement = HTMLInputElement;
}
