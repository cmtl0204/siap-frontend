import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { GadDashboardComponent } from '@modules/core/gad-technician/gad-dashboard/gad-dashboard.component';

export default [{ path: MY_ROUTES.corePages.gadTechnician.dashboard.base, component: GadDashboardComponent }] as Routes;
