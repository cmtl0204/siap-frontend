import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';

export default [
    {
        path: MY_ROUTES.corePages.dacTechnician.base,
        loadChildren: () => import('./dac-technician/dac-technician.routes')
    },
    {
        path: MY_ROUTES.corePages.external.base,
        loadChildren: () => import('./external/external.routes')
    },
    {
        path: MY_ROUTES.corePages.gadTechnician.base,
        loadChildren: () => import('./gad-technician/gad-technician.routes')
    },
    {
        path: MY_ROUTES.corePages.specialistTechnician.base,
        loadChildren: () => import('./specialist-technician/specialist-technician.routes')
    },
    {
        path: MY_ROUTES.corePages.zonalTechnician.base,
        loadChildren: () => import('./zonal-technician/zonal-technician.routes')
    }
] as Routes;
