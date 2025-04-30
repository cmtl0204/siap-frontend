import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { DacDashboardComponent } from '@modules/core/dac-technician/dac-dashboard/dac-dashboard.component';

export default [{ path: MY_ROUTES.corePages.dacTechnician.dashboard.base, component: DacDashboardComponent }] as Routes;
