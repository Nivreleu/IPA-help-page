import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSettings } from './data-settings';

describe('DataSettings', () => {
  let component: DataSettings;
  let fixture: ComponentFixture<DataSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
