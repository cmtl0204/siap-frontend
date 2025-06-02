import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProjectInterface } from '@modules/core/interfaces';
import { Button } from 'primeng/button';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonActionComponent } from '@utils/components/button-action/button-action.component';
import { viewButtonAction } from '@utils/components/button-action/consts';
import { BreadcrumbService } from '../../../../../layout/service/breadcrumb.service';
import { Router } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { Tooltip } from 'primeng/tooltip';
import { StrategicPlanHttpService } from '@modules/core/planner/strategic-plan/strategic-plan-http.service';

@Component({
    selector: 'app-strategic-plan-list',
    imports: [TableModule, Button, ButtonActionComponent, Tooltip],
    templateUrl: './strategic-plan-list.component.html',
    styleUrl: './strategic-plan-list.component.scss'
})
export class StrategicPlanListComponent implements OnInit {
    private readonly _strategicPlanHttpService = inject(StrategicPlanHttpService);
    private readonly _breadcrumbService = inject(BreadcrumbService);
    private readonly _router = inject(Router);
    protected items: ProjectInterface[] = [];
    protected selectedItem!: ProjectInterface;
    protected readonly PrimeIcons = PrimeIcons;
    protected isButtonActionsEnabled = false;
    protected buttonActions: MenuItem[] = [];

    constructor() {
        this._breadcrumbService.setItems([{ label: 'Planes Estratégicos' }]);
    }

    ngOnInit() {
        this.findProjects();
    }

    findProjects(page: number = 1) {
        this._strategicPlanHttpService.find(page).subscribe({
            next: (data) => {
                this.items = data;
            }
        });
    }

    selectItem(item: ProjectInterface) {
        this.isButtonActionsEnabled = true;
        this.selectedItem = item;
        this.buildButtonActions(item);
    }

    buildButtonActions(item: ProjectInterface) {
        this.buttonActions = [
            {
                ...viewButtonAction,
                command: () => {
                    if (this.selectedItem?.id) this.redirectViewStrategicPlan(this.selectedItem.id);
                }
            }
        ];
    }

    redirectViewStrategicPlan(id: string) {
        this._router.navigateByUrl(`${MY_ROUTES.corePages.planner.strategicPlan.absolute}/${id}`);
    }

    redirectProjectDocument(id: string) {
        this._router.navigateByUrl(`${MY_ROUTES.corePages.planner.strategicPlan.document.absolute}/${id}`);
    }

    redirectCreateProject() {
        this._router.navigateByUrl(`${MY_ROUTES.corePages.planner.strategicPlan.form.absolute}/new`);
    }
}
