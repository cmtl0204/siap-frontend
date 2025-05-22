import { Component, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppTopbar } from './app.topbar';
import { AppSidebar } from './app.sidebar';
import { LayoutService } from '../service/layout.service';
import { Divider } from 'primeng/divider';
import { Fluid } from 'primeng/fluid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Message } from 'primeng/message';
import { environment } from '@env/environment';
import { PrimeIcons } from 'primeng/api';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, Divider, Fluid, FormsModule, Message, ReactiveFormsModule],
    template: `
        <p-fluid>
            <div class="flex flex-col md:flex-row gap-8 mt-6">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
                    <div
                        class="card h-full flex flex-col lg:col-start-2 lg:col-span-4 md:col-start-1 md:col-span-6 gap-4">
                        <p-message>
                            <ng-template #icon>
                                <p class="text-lg font-semibold text-center">
                                    {{ environment.APP_NAME }}
                                </p>
                            </ng-template>
                        </p-message>

                        <p-divider />

                        <router-outlet />

                        <img [src]="environment.PATH_ASSETS + '/images/auth/footer.png'" alt="" class="mx-auto" />
                    </div>

                    <div
                        class="card h-full flex flex-col lg:col-start-6 lg:col-span-6 md:col-start-7 md:col-span-6 gap-4">
                        <div class="font-semibold text-xl text-center">{{ environment.APP_NAME }}</div>

                        <p-divider />

                        <div class="flex flex-col gap-2">
                            <a target="_blank" [href]="environment.PATH_ASSETS + '/files/auth/reform_administration_instruction.pdf'">
                                <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    <div class="md:col-span-1 flex flex-col gap-2">
                                        <!--                                    <img-->
                                        <!--                                        [src]="environment.PATH_ASSETS+'/images/auth/cinco_pasos.svg'"-->
                                        <!--                                        alt="cabecera">-->
                                        <i [class]="PrimeIcons.DOWNLOAD"
                                           style="font-size: 2rem;color:var(--primary-color)"></i>
                                    </div>
                                    <div class="md:col-span-11 flex flex-col gap-2">
                                        <h6 class="mb-5" style="color: #01579B">
                                            Reforma para el Instructivo para la Administración del Fondo de Desarrollo Turístico del
                                            Ecuador - Acuerdo 2025-007</h6>
                                    </div>
                                </div>
                            </a>
                            <br />

                            <a target="_blank" [href]="environment.PATH_ASSETS + '/files/auth/administration_instruction.pdf'">
                                <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    <div class="md:col-span-1 flex flex-col gap-2">
                                        <!--                                    <img-->
                                        <!--                                        [src]="environment.PATH_ASSETS+'/images/auth/cinco_pasos.svg'"-->
                                        <!--                                        alt="cabecera">-->
                                        <i [class]="PrimeIcons.DOWNLOAD"
                                           style="font-size: 2rem;color:var(--primary-color)"></i>
                                    </div>
                                    <div class="md:col-span-11 flex flex-col gap-2">
                                        <h6 class="mb-5" style="color: #01579B">
                                            Instructivo para la Administración del Fondo de Desarrollo Turístico del
                                            Ecuador - Acuerdo 2024-012</h6>
                                    </div>
                                </div>
                            </a>
                            <br />

                            <a target="_blank" [href]="environment.PATH_ASSETS + '/files/auth/strategic_plan_guide.pdf'">
                                <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    <div class="md:col-span-1 flex flex-col gap-2">
                                        <!--                                    <img [src]="environment.PATH_ASSETS+'/images/auth/simulador_normativa.svg'"-->
                                        <!--                                         alt="cabecera">-->
                                        <i [class]="PrimeIcons.DOWNLOAD"
                                           style="font-size: 2rem;color:var(--primary-color)"></i>
                                    </div>
                                    <div class="md:col-span-11 flex flex-col gap-2">
                                        <h6 class="mb-5" style="color: #01579B">Guía para la formulación del Plan
                                            Estratégico del Fondo de Desarrollo Turístico del Ecuador</h6>
                                    </div>
                                </div>
                            </a>
                            <br />

                            <a target="_blank" [href]="environment.PATH_ASSETS + '/files/auth/program_guide.pdf'">
                                <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    <div class="md:col-span-1 flex flex-col gap-2">
                                        <!--                                    <img [src]="environment.PATH_ASSETS+'/images/auth/manual_usuario.svg'"-->
                                        <!--                                         alt="cabecera">-->

                                        <i [class]="PrimeIcons.DOWNLOAD"
                                           style="font-size: 2rem;color:var(--primary-color)"></i>
                                    </div>
                                    <div class="md:col-span-11 flex flex-col gap-2">
                                        <h6 class="mb-5" style="color: #01579B">Guía para Programas del Fondo de
                                            Desarrollo Turístico del Ecuador</h6>
                                    </div>
                                </div>
                            </a>
                            <br />

                            <a target="_blank" [href]="environment.PATH_ASSETS + '/files/auth/project_guide.pdf'">
                                <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    <div class="md:col-span-1 flex flex-col gap-2">
                                        <!--                                    <img [src]="environment.PATH_ASSETS+'/images/auth/terminos_condiciones.svg'"-->
                                        <!--                                         alt="cabecera">-->
                                        <i [class]="PrimeIcons.DOWNLOAD"
                                           style="font-size: 2rem;color:var(--primary-color)"></i>
                                    </div>
                                    <div class="md:col-span-11 flex flex-col gap-2">
                                        <h6 class="mb-5" style="color: #01579B">Guía para Proyectos del Fondo de
                                            Desarrollo Turístico del Ecuador</h6>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </p-fluid>
    `
})
export class AppLayoutAuth {
    protected readonly environment = environment;

    protected readonly PrimeIcons = PrimeIcons;

    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    @ViewChild(AppSidebar) appSidebar!: AppSidebar;

    @ViewChild(AppTopbar) appTopBar!: AppTopbar;

    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
                    if (this.isOutsideClicked(event)) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.layoutState().staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.hideMenu();
        });
    }

    isOutsideClicked(event: MouseEvent) {
        const sidebarEl = document.querySelector('.layout-sidebar');
        const topbarEl = document.querySelector('.layout-menu-button');
        const eventTarget = event.target as Node;

        return !(sidebarEl?.isSameNode(eventTarget) || sidebarEl?.contains(eventTarget) || topbarEl?.isSameNode(eventTarget) || topbarEl?.contains(eventTarget));
    }

    hideMenu() {
        this.layoutService.layoutState.update((prev) => ({ ...prev, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
            'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
            'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
            'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
            'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive
        };
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}
