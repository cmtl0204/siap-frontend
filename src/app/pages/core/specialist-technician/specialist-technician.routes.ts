import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { SpecialistDashboardComponent } from '@modules/core/specialist-technician/specialist-dashboard/specialist-dashboard.component';

export default [
    {
        path: MY_ROUTES.corePages.specialistTechnician.dashboard.base,
        component: SpecialistDashboardComponent
    }
] as Routes;
