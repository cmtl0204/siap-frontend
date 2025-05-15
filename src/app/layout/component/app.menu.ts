import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { MY_ROUTES } from '@routes';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: 'MINTUR',
                items: [
                    {
                        label: 'Programas',
                        icon: PrimeIcons.BOOK,
                        routerLink: [MY_ROUTES.corePages.manager.program.list.absolute]
                    },
                    {
                        label: 'Proyectos',
                        icon: PrimeIcons.BOOK,
                        routerLink: [MY_ROUTES.corePages.manager.project.list.absolute]
                    }
                ]
            },
        ];
    }
}
