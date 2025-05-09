import { Component, inject } from '@angular/core';
import { ManagerDashboardComponent } from '@modules/core/manager/manager-dashboard/manager-dashboard.component';
import { AuthService } from '@modules/auth/auth.service';
import { RoleEnum } from '@utils/enums';
import { AdminDashboardComponent } from '@modules/core/admin/admin-dashboard/admin-dashboard.component';

@Component({
    selector: 'app-dashboards',
    imports: [ManagerDashboardComponent, AdminDashboardComponent],
    templateUrl: './dashboards.component.html',
    styleUrl: './dashboards.component.scss'
})
export class DashboardsComponent {
    protected readonly authService = inject(AuthService);
    protected readonly RoleEnum = RoleEnum;
}
