import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AppBlank } from './app/layout/component/app.blank';
import { MY_ROUTES } from '@routes';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [{ path: MY_ROUTES.corePages.base, loadChildren: () => import('./app/pages/pages.routes') }]
    },
    {
        path: '',
        component: AppBlank,
        children: [
            { path: MY_ROUTES.authPages.base, loadChildren: () => import('./app/pages/auth/auth.routes') },
            { path: MY_ROUTES.errorPages.base, loadChildren: () => import('./app/layout/errors/errors.routes') }
        ]
    },
    { path: '**', redirectTo: MY_ROUTES.errorPages.notFound.absolute }
];
