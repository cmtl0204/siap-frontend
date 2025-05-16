import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { ManagerDashboardComponent } from '@modules/core/manager/manager-dashboard/manager-dashboard.component';
import { ProjectFormComponent } from '@modules/core/manager/project/project-form/project-form.component';
import { ProgramFormComponent } from '@modules/core/manager/program/program-form/program-form.component';
import { ProgramListComponent } from '@modules/core/manager/program/program-list/program-list.component';
import { ProjectListComponent } from '@modules/core/manager/project/project-list/project-list.component';
import { ProjectComponent } from '@modules/core/manager/project/project.component';
import { ProgramComponent } from '@modules/core/manager/program/program.component';

export default [
    { path: MY_ROUTES.corePages.manager.dashboard.base, component: ManagerDashboardComponent },

    { path: MY_ROUTES.corePages.manager.project.list.base, component: ProjectListComponent },
    { path: MY_ROUTES.corePages.manager.project.base + '/:id', component: ProjectComponent },
    { path: MY_ROUTES.corePages.manager.project.form.base + '/:id', component: ProjectFormComponent },

    { path: MY_ROUTES.corePages.manager.program.list.base, component: ProgramListComponent },
    { path: MY_ROUTES.corePages.manager.program.base + '/:id', component: ProgramComponent },
    { path: MY_ROUTES.corePages.manager.program.form.base + '/:id', component: ProgramFormComponent }
] as Routes;
