import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateGrade } from './calculate-grade';

describe('CalculateGrade', () => {
  let component: CalculateGrade;
  let fixture: ComponentFixture<CalculateGrade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculateGrade]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculateGrade);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
