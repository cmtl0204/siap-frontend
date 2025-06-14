import { Component, inject } from '@angular/core';
import { OperatorDashboardComponent } from '@modules/core/operator/operator-dashboard/operator-dashboard.component';
import { AuthService } from '@modules/auth/auth.service';
import { RoleEnum } from '@utils/enums';
import { AdminDashboardComponent } from '@modules/core/admin/admin-dashboard/admin-dashboard.component';
import { BreadcrumbService } from '../../layout/service/breadcrumb.service';
import { PlannerDashboardComponent } from '@modules/core/planner/planner-dashboard/planner-dashboard.component';

@Component({
    selector: 'app-dashboards',
    imports: [OperatorDashboardComponent, AdminDashboardComponent, PlannerDashboardComponent],
    templateUrl: './dashboards.component.html',
    styleUrl: './dashboards.component.scss'
})
export class DashboardsComponent {
    protected readonly authService = inject(AuthService);
    private readonly _breadcrumbService = inject(BreadcrumbService);

    protected readonly RoleEnum = RoleEnum;

    constructor() {
        this._breadcrumbService.setItems([{ label: 'Dashboard' }]);
    }
}
