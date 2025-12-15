import {CriteriaOverview} from './criteria-overview/criteria-overview';
import {CalculateGrade} from './calculate-grade/calculate-grade';

export const routes = [
  { path: '', component: CriteriaOverview },
  { path: 'grade', component: CalculateGrade },
];
