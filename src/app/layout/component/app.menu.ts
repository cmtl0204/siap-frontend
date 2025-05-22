import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { MY_ROUTES } from '@routes';
import { AuthService } from '@modules/auth/auth.service';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule, Ripple],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
        <div class="mt-auto">
            <hr class="mb-4 mx-4 border-t border-0 border-surface" />

            <a (click)="signOut()" pRipple class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                <i [class]="PrimeIcons.POWER_OFF" style="color:red "></i>
                <span class="font-bold" style="color: red"> Cerrar Sesión </span>
            </a>
        </div>
    `
})
export class AppMenu implements OnInit {
    model: MenuItem[] = [];
    protected readonly PrimeIcons = PrimeIcons;
    protected readonly authService = inject(AuthService);

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
                        icon: PrimeIcons.LIST,
                        routerLink: [MY_ROUTES.corePages.manager.program.list.absolute]
                    },
                    {
                        label: 'Proyectos',
                        icon: PrimeIcons.LIST_CHECK,
                        routerLink: [MY_ROUTES.corePages.manager.project.list.absolute]
                    }
                ]
            }
        ];
    }

    signOut() {
        this.authService.removeLogin();
    }
}
