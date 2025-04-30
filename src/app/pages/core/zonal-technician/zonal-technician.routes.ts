import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { ZonalDashboardComponent } from '@modules/core/zonal-technician/zonal-dashboard/zonal-dashboard.component';

export default [
    {
        path: MY_ROUTES.pagesCore.specialistTechnician.dashboard.base,
        component: ZonalDashboardComponent
    }
] as Routes;
