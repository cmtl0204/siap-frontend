import { Component, inject } from '@angular/core';
import { AuthService } from '@modules/auth/auth.service';
import { ProgramListComponent } from '@modules/core/manager/program/program-list/program-list.component';

@Component({
    selector: 'app-program',
    imports: [ProgramListComponent],
    templateUrl: './program.component.html',
    styleUrl: './program.component.scss'
})
export class ProgramComponent {
    protected readonly authService = inject(AuthService);
}
