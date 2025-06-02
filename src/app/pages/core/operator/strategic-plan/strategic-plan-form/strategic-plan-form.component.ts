import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fluid } from 'primeng/fluid';
import { InputText } from 'primeng/inputtext';
import { LabelDirective } from '@utils/directives/label.directive';
import { ErrorMessageDirective } from '@utils/directives/error-message.directive';
import { Message } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';
import { CustomMessageService } from '@utils/services/custom-message.service';
import { BreadcrumbService } from '../../../../../layout/service/breadcrumb.service';
import { MY_ROUTES } from '@routes';
import { Router } from '@angular/router';
import { StrategicPlanHttpService } from '@modules/core/operator/strategic-plan/strategic-plan-http.service';

@Component({
    selector: 'app-strategic-plan-form',
    imports: [Fluid, InputText, ReactiveFormsModule, LabelDirective, ErrorMessageDirective, Message, DatePickerModule, InputNumberModule, Button],
    templateUrl: './strategic-plan-form.component.html',
    styleUrl: './strategic-plan-form.component.scss'
})
export class StrategicPlanFormComponent implements OnInit, OnChanges {
    @Input() id!: string | undefined;
    private readonly _formBuilder = inject(FormBuilder);
    private readonly _breadcrumbService = inject(BreadcrumbService);
    private readonly _strategicPlanHttpService = inject(StrategicPlanHttpService);
    protected readonly _router = inject(Router);
    protected readonly _customMessageService = inject(CustomMessageService);
    protected readonly PrimeIcons = PrimeIcons;
    protected form!: FormGroup;

    constructor() {
        this._breadcrumbService.setItems([
            {
                label: 'Planes Estratégicos',
                routerLink: [MY_ROUTES.corePages.operator.strategicPlan.list.absolute]
            },
            { label: 'Formulario' }
        ]);

        this.buildForm();
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['id'] && this.id && this.id !== 'new') {
            this.findStrategicPlan();
        } else if (this.id === 'new') {
            this.form.enable(); // si quieres permitir edición
        }
    }

    buildForm() {
        this.form = this._formBuilder.group({
            name: [null, [Validators.required]]
        });
    }

    findStrategicPlan() {
        this._strategicPlanHttpService.findOne(this.id!).subscribe({
            next: (response) => {
                if (response) {
                    this.form.patchValue(response);
                    this.form.disable();
                }
            }
        });
    }

    onSubmit() {
        if (this.validateForm()) {
            if (this.id === 'new') this.createStrategicPlan();
            else this.updateStrategicPlan();
        }
    }

    validateForm() {
        const errors: string[] = [];

        if (this.nameField.invalid) errors.push('Nombre del Proyecto');

        if (errors.length > 0) {
            this.form.markAllAsTouched();
            this._customMessageService.showFormErrors(errors);
        }

        return this.form.valid && errors.length === 0;
    }

    createStrategicPlan() {
        this._strategicPlanHttpService.create(this.form.value).subscribe({
            next: (data) => {
                this._router.navigateByUrl(MY_ROUTES.corePages.operator.strategicPlan.list.absolute);
            }
        });
    }

    updateStrategicPlan() {
        this._strategicPlanHttpService.update(this.id!, this.form.value).subscribe();
    }

    get nameField(): AbstractControl {
        return this.form.controls['name'];
    }
}
