import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProjectInterface } from '@modules/core/interfaces';
import { CurrencyPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonActionComponent } from '@utils/components/button-action/button-action.component';
import { documentButtonAction, viewButtonAction } from '@utils/components/button-action/consts';
import { BreadcrumbService } from '../../../../../layout/service/breadcrumb.service';
import { Router } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { Tooltip } from 'primeng/tooltip';
import { ProgramHttpService } from '@modules/core/operator/program/program-http.service';

@Component({
    selector: 'app-program-list',
    imports: [TableModule, CurrencyPipe, Button, ButtonActionComponent, Tooltip],
    templateUrl: './program-list.component.html',
    styleUrl: './program-list.component.scss'
})
export class ProgramListComponent implements OnInit {
    private readonly _programHttpService = inject(ProgramHttpService);
    private readonly _breadcrumbService = inject(BreadcrumbService);
    private readonly _router = inject(Router);
    protected items: ProjectInterface[] = [];
    protected selectedItem!: ProjectInterface;
    protected readonly PrimeIcons = PrimeIcons;
    protected isButtonActionsEnabled = false;
    protected buttonActions: MenuItem[] = [];

    constructor() {
        this._breadcrumbService.setItems([{ label: 'Programas' }]);
    }

    ngOnInit() {
        this.findProjects();
    }

    findProjects(page: number = 1) {
        this._programHttpService.find(page).subscribe({
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
            },
        ];
    }

    redirectViewProject(id: string) {
        this._router.navigateByUrl(`${MY_ROUTES.corePages.operator.program.absolute}/${id}`);
    }

    redirectProjectDocument(id: string) {
        this._router.navigateByUrl(`${MY_ROUTES.corePages.operator.program.document.absolute}/${id}`);
    }

    redirectCreateProject() {
        this._router.navigateByUrl(`${MY_ROUTES.corePages.operator.program.form.absolute}/new`);
    }
}
