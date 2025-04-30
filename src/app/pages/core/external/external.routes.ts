import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { DacDashboardComponent } from '@modules/core/dac-technician/dac-dashboard/dac-dashboard.component';
import { ExternalDashboardComponent } from '@modules/core/external/external-dashboard/external-dashboard.component';

export default [{ path: MY_ROUTES.pagesCore.external.dashboard.base, component: ExternalDashboardComponent }] as Routes;
