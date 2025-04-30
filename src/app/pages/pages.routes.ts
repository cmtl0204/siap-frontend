import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { C1Component } from '@modules/c1/c1.component';

export default [
    { path: MY_ROUTES.corePages.base, loadChildren: () => import('./core/core.routes') },
    { path: 'c1', component: C1Component }
] as Routes;
