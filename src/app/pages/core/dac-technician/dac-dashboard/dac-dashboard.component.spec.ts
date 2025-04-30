import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DacDashboardComponent } from './dac-dashboard.component';

describe('DacDashboardComponent', () => {
  let component: DacDashboardComponent;
  let fixture: ComponentFixture<DacDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DacDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DacDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
