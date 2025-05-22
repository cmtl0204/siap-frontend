import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProjectInterface } from '@modules/core/interfaces';
import { ProjectHttpService } from '@modules/core/operator/project/project-http.service';
import { CurrencyPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonActionComponent } from '@utils/components/button-action/button-action.component';
import { attachButtonAction, documentButtonAction, editButtonAction, viewButtonAction } from '@utils/components/button-action/consts';
import { BreadcrumbService } from '../../../../../layout/service/breadcrumb.service';
import { Router } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { Tooltip } from 'primeng/tooltip';
import { AuthService } from '@modules/auth/auth.service';

@Component({
    selector: 'app-project-list',
    imports: [TableModule, CurrencyPipe, Button, ButtonActionComponent, Tooltip],
    templateUrl: './project-list.component.html',
    styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
    private readonly _authService = inject(AuthService);
    private readonly _projectHttpService = inject(ProjectHttpService);
    private readonly _breadcrumbService = inject(BreadcrumbService);
    private readonly _router = inject(Router);
    protected items: ProjectInterface[] = [];
    protected selectedItem!: ProjectInterface;
    protected readonly PrimeIcons = PrimeIcons;
    protected isButtonActionsEnabled = false;
    protected buttonActions: MenuItem[] = [];

    constructor() {
        this._breadcrumbService.setItems([{ label: 'Proyectos' }]);
    }

    ngOnInit() {
        this.findProjectsByUser();
    }

    findProjectsByUser() {
        this._projectHttpService.findProjectsByUser(this._authService.auth.id).subscribe({
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
                    if (this.selectedItem?.id) this.redirectViewProject(this.selectedItem.id);
                }
            }
        ];
    }

    redirectViewProject(id: string) {
        this._router.navigateByUrl(`${MY_ROUTES.corePages.operator.project.absolute}/${id}`);
    }

    redirectProjectDocument(id: string) {
        this._router.navigateByUrl(`${MY_ROUTES.corePages.operator.project.document.absolute}/${id}`);
    }

    redirectCreateProject() {
        this._router.navigateByUrl(`${MY_ROUTES.corePages.operator.project.form.absolute}/new`);
    }
}
