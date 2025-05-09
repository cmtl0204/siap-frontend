import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';

export default [
    {
        path: MY_ROUTES.corePages.manager.base,
        loadChildren: () => import('@modules/core/manager/manager.routes')
    },
] as Routes;
