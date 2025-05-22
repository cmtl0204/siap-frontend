import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { OperatorDashboardComponent } from '@modules/core/operator/operator-dashboard/operator-dashboard.component';
import { ProjectComponent } from '@modules/core/operator/project/project.component';

export default [
    { path: MY_ROUTES.corePages.operator.dashboard.base, component: OperatorDashboardComponent },
    { path: MY_ROUTES.corePages.operator.project.base, component: ProjectComponent },
] as Routes;
