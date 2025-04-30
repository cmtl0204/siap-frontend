import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonalDashboardComponent } from './zonal-dashboard.component';

describe('ZonalDashboardComponent', () => {
  let component: ZonalDashboardComponent;
  let fixture: ComponentFixture<ZonalDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonalDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
