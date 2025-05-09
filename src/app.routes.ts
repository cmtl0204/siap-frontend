import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { AppLayoutMain } from './app/layout/component/app.layout-main';
import { AppLayoutBlank } from './app/layout/component/app.layout-blank';
import { AppLayoutAuth } from './app/layout/component/app.layout-auth';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayoutMain,
        children: [
            { path: MY_ROUTES.dashboards.base, loadChildren: () => import('./app/pages/dashboards/dashboard.routes') },
            { path: MY_ROUTES.corePages.base, loadChildren: () => import('./app/pages/core/core.routes') },
        ]
    },

    {
        path: '',
        component: AppLayoutBlank,
        children: [
            { path: MY_ROUTES.errorPages.base, loadChildren: () => import('./app/layout/errors/errors.routes') }
        ]
    },

    {
        path: '',
        component: AppLayoutAuth,
        children: [
            { path: MY_ROUTES.authPages.base, loadChildren: () => import('./app/pages/auth/auth.routes') },
        ]
    },

    { path: '**', redirectTo: MY_ROUTES.errorPages.notFound.absolute }
];
