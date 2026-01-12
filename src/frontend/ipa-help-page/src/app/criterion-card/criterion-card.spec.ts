import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionCard } from './criterion-card';

describe('CriterionCard', () => {
  let component: CriterionCard;
  let fixture: ComponentFixture<CriterionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriterionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriterionCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
