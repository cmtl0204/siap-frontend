import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';

export default [
    {
        path: MY_ROUTES.corePages.operator.base,
        loadChildren: () => import('@modules/core/operator/operator.routes')
    }
] as Routes;
