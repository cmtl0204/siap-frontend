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
import { Fluid } from 'primeng/fluid';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { CoreService } from '@utils/services';
import { PaginatorInterface } from '@utils/interfaces';

@Component({
    selector: 'app-project-list',
    imports: [TableModule, CurrencyPipe, Button, ButtonActionComponent, Tooltip, Fluid, IconField, InputIcon, InputText, ReactiveFormsModule, Paginator],
    templateUrl: './project-list.component.html',
    styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
    private readonly _authService = inject(AuthService);
    protected readonly coreService = inject(CoreService);
    private readonly _projectHttpService = inject(ProjectHttpService);
    private readonly _breadcrumbService = inject(BreadcrumbService);
    private readonly _router = inject(Router);
    protected items: ProjectInterface[] = [];
    protected selectedItem!: ProjectInterface;
    protected readonly PrimeIcons = PrimeIcons;
    protected isButtonActionsEnabled = false;
    protected buttonActions: MenuItem[] = [];
    protected searchControl: FormControl = new FormControl(null);
    protected paginatorInterface!: PaginatorInterface;

    constructor() {
        this._breadcrumbService.setItems([{ label: 'Proyectos' }]);

        this.paginatorInterface = this.coreService.paginator;

        this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
            this.findAllProjects();
        });
    }

    ngOnInit() {
        this.findAllProjects();
    }

    findAllProjects(page = 1) {
        this._projectHttpService.findAll(page, this.searchControl.value).subscribe({
            next: (response) => {
                this.items = response.data;
                this.paginatorInterface = { ...response.pagination!, firstItem: 0 };
            }
        });
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

    redirectCreateProject() {
        this._router.navigateByUrl(`${MY_ROUTES.corePages.operator.project.form.absolute}/new`);
    }

    onPageChange(event: PaginatorState) {
        this.findAllProjects(event.page! + 1);
    }
}
