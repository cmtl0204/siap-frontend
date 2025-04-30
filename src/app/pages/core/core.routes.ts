import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';

export default [
    {
        path: MY_ROUTES.pagesCore.dacTechnician.base,
        loadChildren: () => import('./dac-technician/dac-technician.routes')
    },
    {
        path: MY_ROUTES.pagesCore.external.base,
        loadChildren: () => import('./external/external.routes')
    },
    {
        path: MY_ROUTES.pagesCore.gadTechnician.base,
        loadChildren: () => import('./gad-technician/gad-technician.routes')
    },
    {
        path: MY_ROUTES.pagesCore.specialistTechnician.base,
        loadChildren: () => import('./specialist-technician/specialist-technician.routes')
    },
    {
        path: MY_ROUTES.pagesCore.zonalTechnician.base,
        loadChildren: () => import('./zonal-technician/zonal-technician.routes')
    }
] as Routes;
