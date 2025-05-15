import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { ManagerDashboardComponent } from '@modules/core/manager/manager-dashboard/manager-dashboard.component';
import { ProjectComponent } from '@modules/core/manager/project/project.component';
import { ProjectFormComponent } from '@modules/core/manager/project/project-form/project-form.component';
import { ProjectDocumentComponent } from '@modules/core/manager/project/project-document/project-document.component';
import { ProgramDocumentComponent } from '@modules/core/manager/program/program-document/program-document.component';
import { ProgramFormComponent } from '@modules/core/manager/program/program-form/program-form.component';
import { ProgramListComponent } from '@modules/core/manager/program/program-list/program-list.component';

export default [
    { path: MY_ROUTES.corePages.manager.dashboard.base, component: ManagerDashboardComponent },
    { path: MY_ROUTES.corePages.manager.project.list.base, component: ProjectComponent },
    { path: MY_ROUTES.corePages.manager.project.form.base + '/:id', component: ProjectFormComponent },
    { path: MY_ROUTES.corePages.manager.project.document.base + '/:id', component: ProjectDocumentComponent },
    { path: MY_ROUTES.corePages.manager.program.list.base, component: ProgramListComponent },
    { path: MY_ROUTES.corePages.manager.program.form.base + '/:id', component: ProgramFormComponent },
    { path: MY_ROUTES.corePages.manager.program.document.base + '/:id', component: ProgramDocumentComponent }
] as Routes;
