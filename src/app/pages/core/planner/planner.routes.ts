import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { ProjectFormComponent } from '@modules/core/planner/project/project-form/project-form.component';
import { ProgramFormComponent } from '@modules/core/planner/program/program-form/program-form.component';
import { ProgramListComponent } from '@modules/core/planner/program/program-list/program-list.component';
import { ProjectListComponent } from '@modules/core/planner/project/project-list/project-list.component';
import { ProjectComponent } from '@modules/core/planner/project/project.component';
import { ProgramComponent } from '@modules/core/planner/program/program.component';
import { StrategicPlanListComponent } from '@modules/core/planner/strategic-plan/strategic-plan-list/strategic-plan-list.component';
import { StrategicPlanFormComponent } from '@modules/core/planner/strategic-plan/strategic-plan-form/strategic-plan-form.component';
import { StrategicPlanComponent } from '@modules/core/planner/strategic-plan/strategic-plan.component';
import { PlannerDashboardComponent } from '@modules/core/planner/planner-dashboard/planner-dashboard.component';

export default [
    { path: MY_ROUTES.corePages.planner.dashboard.base, component: PlannerDashboardComponent },

    { path: MY_ROUTES.corePages.planner.strategicPlan.list.base, component: StrategicPlanListComponent },
    { path: MY_ROUTES.corePages.planner.strategicPlan.base + '/:id', component: StrategicPlanComponent },
    { path: MY_ROUTES.corePages.planner.strategicPlan.form.base + '/:id', component: StrategicPlanFormComponent },

    { path: MY_ROUTES.corePages.planner.project.list.base, component: ProjectListComponent },
    { path: MY_ROUTES.corePages.planner.project.base + '/:id', component: ProjectComponent },
    { path: MY_ROUTES.corePages.planner.project.form.base + '/:id', component: ProjectFormComponent },

    { path: MY_ROUTES.corePages.planner.program.list.base, component: ProgramListComponent },
    { path: MY_ROUTES.corePages.planner.program.base + '/:id', component: ProgramComponent },
    { path: MY_ROUTES.corePages.planner.program.form.base + '/:id', component: ProgramFormComponent }
] as Routes;
