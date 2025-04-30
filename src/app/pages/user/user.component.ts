import { Component, inject } from '@angular/core';
import { Step, StepItem, StepList, StepPanel, StepPanels, Stepper } from 'primeng/stepper';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { PrimeIcons } from 'primeng/api';
import { AuthHttpService } from '@modules/auth/auth-http.service';
import { AuthService } from '@modules/auth/auth.service';
import { Dialog } from 'primeng/dialog';
import { PersonalInformationComponent } from '@modules/user/personal-information/personal-information.component';
import { BankDetailComponent } from '@modules/user/bank-detail/bank-detail.component';

@Component({
    selector: 'app-validation-guide',
    imports: [Stepper, StepList, Step, NgClass, StepPanels, StepPanel, FormsModule, PersonalInformationComponent, BankDetailComponent, Drawer, Button, Dialog, PersonalInformationComponent, BankDetailComponent],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    standalone: true
})
export class UserComponent {
    private readonly _authHttpService = inject(AuthHttpService);
    protected readonly _authService = inject(AuthService);
    protected activeStep: number = 1;
    protected visible!: boolean;
    protected visibleBanner!: boolean;
    protected termsConditions!: boolean;

    protected readonly PrimeIcons = PrimeIcons;

    constructor() {
        this.visible = !this._authService.auth.termsConditions;
        this.termsConditions = this._authService.auth.termsConditions;
        this.visibleBanner = this._authService.auth.termsConditions;
    }

    acceptTermsConditions() {
        this._authHttpService.acceptTermsConditions().subscribe({
            next: (result) => {
                this.termsConditions = true;
                this.visibleBanner = true;
                this.visible = false;
            }
        });
    }

    rejectTermsConditions() {
        if (!this._authService.auth?.termsConditions) {
            this._authHttpService.rejectTermsConditions().subscribe({
                next: () => {
                    this._authService.removeLogin();
                }
            });
        }
    }

    downloadTermsConditions(){
        window.open('files/terms_conditions.pdf', '_blank');
    }
}
