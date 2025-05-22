import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { OperatorDashboardComponent } from '@modules/core/operator/operator-dashboard/operator-dashboard.component';
import { ProjectFormComponent } from '@modules/core/operator/project/project-form/project-form.component';
import { ProgramFormComponent } from '@modules/core/operator/program/program-form/program-form.component';
import { ProgramListComponent } from '@modules/core/operator/program/program-list/program-list.component';
import { ProjectListComponent } from '@modules/core/operator/project/project-list/project-list.component';
import { ProjectComponent } from '@modules/core/operator/project/project.component';
import { ProgramComponent } from '@modules/core/operator/program/program.component';
import { StrategicPlanListComponent } from '@modules/core/operator/strategic-plan/strategic-plan-list/strategic-plan-list.component';
import { StrategicPlanFormComponent } from '@modules/core/operator/strategic-plan/strategic-plan-form/strategic-plan-form.component';
import { StrategicPlanComponent } from '@modules/core/operator/strategic-plan/strategic-plan.component';

export default [
    { path: MY_ROUTES.corePages.operator.dashboard.base, component: OperatorDashboardComponent },

    { path: MY_ROUTES.corePages.operator.strategicPlan.list.base, component: StrategicPlanListComponent },
    { path: MY_ROUTES.corePages.operator.strategicPlan.base + '/:id', component: StrategicPlanComponent },
    { path: MY_ROUTES.corePages.operator.strategicPlan.form.base + '/:id', component: StrategicPlanFormComponent },

    { path: MY_ROUTES.corePages.operator.project.list.base, component: ProjectListComponent },
    { path: MY_ROUTES.corePages.operator.project.base + '/:id', component: ProjectComponent },
    { path: MY_ROUTES.corePages.operator.project.form.base + '/:id', component: ProjectFormComponent },

    { path: MY_ROUTES.corePages.operator.program.list.base, component: ProgramListComponent },
    { path: MY_ROUTES.corePages.operator.program.base + '/:id', component: ProgramComponent },
    { path: MY_ROUTES.corePages.operator.program.form.base + '/:id', component: ProgramFormComponent }
] as Routes;
