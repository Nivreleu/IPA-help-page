import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { IpaService } from '../service/ipa.service';
import { GradeService, Guetestufe } from '../service/grade-service';

type GueteNum = 0 | 1 | 2 | 3;

@Component({
  selector: 'app-calculate-grade',
  standalone: true,
  templateUrl: './calculate-grade.html',
  styleUrl: './calculate-grade.scss',
})
export class CalculateGrade implements OnInit {
  private route = inject(ActivatedRoute);
  private ipaService = inject(IpaService);
  private gradeService = inject(GradeService);

  criteria = signal<any[]>([]);
  isLoading = signal(true);

  username = toSignal(
    this.route.paramMap.pipe(map(p => p.get('username') ?? 'unknown')),
    { initialValue: 'unknown' }
  );

  ngOnInit() {
    this.isLoading.set(true);

    this.ipaService.getExampleCriteria().subscribe({
      next: (data: any) => {
        this.criteria.set(data ?? []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('ERROR loading criteria:', err);
        this.criteria.set([]);
        this.isLoading.set(false);
      },
    });
  }

  private gueteToNumber(g: Guetestufe | null): GueteNum {
    if (g === 'G1') return 1;
    if (g === 'G2') return 2;
    if (g === 'G3') return 3;
    return 0; // NZ oder null
  }

  perCriterion = computed(() => {
    const user = this.username();
    const stored = this.gradeService.getAllGrades(user); // Record<criterionId, Guetestufe>

    // ✅ ALLE Kriterien aus dem Service (auch wenn nicht geklickt)
    return this.criteria().map(c => {
      const id = c.id;
      const g = stored[id] ?? null;

      return {
        criterionId: id,
        name: c.name ?? id,
        guetestufe: g ?? 'NZ',
        points: this.gueteToNumber(g),
      };
    });
  });

  totals = computed(() => {
    const list = this.perCriterion();
    const criteriaCount = list.length;

    const reached = list.reduce((acc, c) => acc + c.points, 0);
    const max = criteriaCount * 3;

    return { criteriaCount, reached, max };
  });

  grade = computed(() => {
    const { reached, max } = this.totals();
    if (max === 0) return null;

    const note = (reached * 5) / max + 1;
    return Math.round(note * 10) / 10;
  });
}
