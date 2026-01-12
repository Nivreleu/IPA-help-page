import { Component, OnInit, signal } from '@angular/core';
import { CriterionCard } from '../criterion-card/criterion-card';
import { IpaService } from '../service/ipa.service';

@Component({
  selector: 'app-criteria-overview',
  standalone: true,
  imports: [CriterionCard],
  templateUrl: './criteria-overview.html',
  styleUrl: './criteria-overview.scss',
})
export class CriteriaOverview implements OnInit {
  criteria = signal<any[]>([]);
  isLoading = signal(true);

  constructor(private ipaService: IpaService) {}

  ngOnInit() {
    this.isLoading.set(true);

    this.ipaService.getExampleCriteria().subscribe({
      next: (data: any) => {
        console.log('DATA:', data);
        this.criteria.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('ERROR loading criteria:', err);
        this.isLoading.set(false);
      },
    });
  }
}
