import { Component, Input, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

type Criterion = {
  id: string;
  teil: 1 | 2; // falls du Teil 1/2 getrennt willst, sonst kannst du das ignorieren
  anforderungen: { id: string }[];
};

@Component({
  selector: 'app-calculate-grade',
  standalone: true,
  templateUrl: './calculate-grade.html',
  styleUrl: './calculate-grade.scss',
})
export class CalculateGrade {
  private route = inject(ActivatedRoute);

  // Kriterien vom Parent geben (oder per Service laden)
  @Input() criteria: Criterion[] = [];

  username = toSignal(
    this.route.paramMap.pipe(map(p => p.get('username') ?? 'unknown')),
    { initialValue: 'unknown' }
  );

  private readCheckedReqIds(criterionId: string): string[] {
    const key = `ipahelp:reqs:${this.username()}:${criterionId}`;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  }

  /** Summe erreicht / max (über alle Kriterien) */
  total = computed(() => {
    let reached = 0;
    let max = 0;

    for (const c of this.criteria) {
      const checked = this.readCheckedReqIds(c.id).length;
      reached += checked;
      max += c.anforderungen?.length ?? 0;
    }

    return { reached, max };
  });

  /** Note = (reached * 5) / max + 1 */
  grade = computed(() => {
    const { reached, max } = this.total();
    if (max === 0) return null;

    const note = (reached * 5) / max + 1;
    return Math.round(note * 10) / 10; // 0.1 runden (optional)
  });

  /** Falls du Teil 1/2 getrennt willst: */
  totalTeil = (teil: 1 | 2) => computed(() => {
    let reached = 0;
    let max = 0;

    for (const c of this.criteria.filter(x => x.teil === teil)) {
      reached += this.readCheckedReqIds(c.id).length;
      max += c.anforderungen?.length ?? 0;
    }

    return { reached, max };
  });

  gradeTeil = (teil: 1 | 2) => computed(() => {
    const { reached, max } = this.totalTeil(teil)();
    if (max === 0) return null;
    const note = (reached * 5) / max + 1;
    return Math.round(note * 10) / 10;
  });


}
