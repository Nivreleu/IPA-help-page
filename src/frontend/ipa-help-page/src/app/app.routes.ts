import {CriteriaOverview} from './criteria-overview/criteria-overview';
import {CalculateGrade} from './calculate-grade/calculate-grade';
import {UserLogin} from './user-login/user-login';
import {DataSettings} from './data-settings/data-settings';

export const routes = [
  { path: '', component: UserLogin },
  { path: 'overview/:username', component: CriteriaOverview },
  { path: 'settings/:username', component: DataSettings },
  { path: 'grade/:username', component: CalculateGrade },
];
