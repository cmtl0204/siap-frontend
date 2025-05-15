import { Component, inject } from '@angular/core';
import { AuthService } from '@modules/auth/auth.service';
import { ProjectListComponent } from '@modules/core/manager/project/project-list/project-list.component';

@Component({
    selector: 'app-project',
    imports: [ProjectListComponent],
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss'
})
export class ProjectComponent {
    protected readonly authService = inject(AuthService);
}
