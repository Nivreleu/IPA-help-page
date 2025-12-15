import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaOverview } from './criteria-overview';

describe('CriteriaOverview', () => {
  let component: CriteriaOverview;
  let fixture: ComponentFixture<CriteriaOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriteriaOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
