import {CriteriaOverview} from './criteria-overview/criteria-overview';
import {CalculateGrade} from './calculate-grade/calculate-grade';
import {UserLogin} from './user-login/user-login';

export const routes = [
  { path: '', component: UserLogin },
  { path: 'overview/:username', component: CriteriaOverview },
  { path: 'grade/:username', component: CalculateGrade },
];
