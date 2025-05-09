import { Component, inject } from '@angular/core';
import { ProjectListComponent } from '@modules/core/manager/project/project-list/project-list.component';
import { ProjectFormComponent } from '@modules/core/manager/project/project-form/project-form.component';
import { AuthService } from '@modules/auth/auth.service';

@Component({
    selector: 'app-project',
    imports: [ProjectListComponent, ProjectFormComponent],
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss'
})
export class ProjectComponent {
    protected readonly authService=inject(AuthService);
}
