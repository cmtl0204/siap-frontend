import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonActionComponent } from '@utils/components/button-action/button-action.component';
import { documentButtonAction, viewButtonAction } from '@utils/components/button-action/consts';
import { BreadcrumbService } from '../../../../../layout/service/breadcrumb.service';
import { Router } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { Tooltip } from 'primeng/tooltip';
import { ProgramInterface } from '@modules/core/interfaces/program.interface';
import { ProgramHttpService } from '@modules/core/manager/program/program-http.service';

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
    protected items: ProgramInterface[] = [];
    protected selectedItem!: ProgramInterface;
    protected readonly PrimeIcons = PrimeIcons;
    protected isButtonActionsEnabled = false;
    protected buttonActions: MenuItem[] = [];

    constructor() {
        this._breadcrumbService.setItems([{ label: 'Programas' }]);
    }

    ngOnInit() {
        this.findPrograms();
    }

    findPrograms(page: number = 1) {
        this._programHttpService.findAll(page).subscribe({
            next: (data) => {
                this.items = data;
            }
        });
    }

    selectItem(item: ProgramInterface) {
        this.isButtonActionsEnabled = true;
        this.selectedItem = item;
        this.buildButtonActions(item);
    }

    buildButtonActions(item: ProgramInterface) {
        this.buttonActions = [
            {
                ...viewButtonAction,
                command: () => {
                    if (this.selectedItem?.id) this.redirectViewProgram(this.selectedItem.id);
                }
            },
            {
                ...documentButtonAction,
                command: () => {
                    if (this.selectedItem?.id) this.redirectProgramDocument(this.selectedItem.id);
                }
            }
        ];
    }

    redirectViewProgram(id: string) {
        this._router.navigateByUrl(`${MY_ROUTES.corePages.manager.program.form.absolute}/${id}`);
    }

    redirectProgramDocument(id: string) {
        this._router.navigateByUrl(`${MY_ROUTES.corePages.manager.program.document.absolute}/${id}`);
    }

    redirectCreateProgram() {
        this._router.navigateByUrl(`${MY_ROUTES.corePages.manager.program.form.absolute}/new`);
    }
}
