import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AppBlank } from './app/layout/component/app.blank';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', loadChildren: () => import('./app/pages/core/dashboard/dashboard.routes') },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    {
        path: '',
        component: AppBlank,
        children: [
            { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
        ]
    },
    { path: '**', redirectTo: '/notfound' }
];
