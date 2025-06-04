import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgramHttpService } from '@modules/core/operator/program/program-http.service';
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
import { Divider } from 'primeng/divider';

@Component({
    selector: 'app-program-form',
    imports: [Fluid, InputText, ReactiveFormsModule, LabelDirective, ErrorMessageDirective, Message, DatePickerModule, InputNumberModule, Button, Divider],
    templateUrl: './program-form.component.html',
    styleUrl: './program-form.component.scss'
})
export class ProgramFormComponent implements OnInit, OnChanges {
    @Input() id!: string | undefined;
    private readonly _formBuilder = inject(FormBuilder);
    private readonly _breadcrumbService = inject(BreadcrumbService);
    private readonly _programHttpService = inject(ProgramHttpService);
    protected readonly _router = inject(Router);
    protected readonly _customMessageService = inject(CustomMessageService);
    protected readonly PrimeIcons = PrimeIcons;
    protected form!: FormGroup;

    constructor() {
        this._breadcrumbService.setItems([
            {
                label: 'Programas',
                routerLink: [MY_ROUTES.corePages.operator.program.list.absolute]
            },
            { label: 'Formulario' }
        ]);

        this.buildForm();
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['id'] && this.id && this.id !== 'new') {
            this.findProgram();
        } else if (this.id === 'new') {
            this.form.enable();
        }
    }

    buildForm() {
        this.form = this._formBuilder.group({
            amount: [null, [Validators.required]],
            executorUndersecretary: [null, [Validators.required]],
            code: [null, [Validators.required]],
            endedAt: [null, [Validators.required]],
            name: [null, [Validators.required]],
            startedAt: [null, [Validators.required]],
            term: [null, [Validators.required]]
        });
    }

    findProgram() {
        this._programHttpService.findOne(this.id!).subscribe({
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
            if (this.id === 'new') this.createProgram();
            else this.updateProgram();
        }
    }

    validateForm() {
        const errors: string[] = [];

        if (this.codeField.invalid) errors.push('Código');
        if (this.nameField.invalid) errors.push('Código del programa institucional CPI');
        if (this.amountField.invalid) errors.push('Monto total del programa');
        if (this.executorUndersecretaryField.invalid) errors.push('Subsecretarías ejecutoras');
        if (this.termField.invalid) errors.push('Plazo de ejecución del programa (meses)');
        if (this.startedAtField.invalid) errors.push('Fecha inicio');
        if (this.endedAtField.invalid) errors.push('Fecha fin');

        if (errors.length > 0) {
            this.form.markAllAsTouched();
            this._customMessageService.showFormErrors(errors);
        }

        return this.form.valid && errors.length === 0;
    }

    createProgram() {
        this._programHttpService.create(this.form.value).subscribe({
            next: (data) => {
                this._router.navigateByUrl(MY_ROUTES.corePages.operator.program.list.absolute);
            }
        });
    }

    updateProgram() {
        this._programHttpService.update(this.id!, this.form.value).subscribe();
    }

    get codeField(): AbstractControl {
        return this.form.controls['code'];
    }

    get nameField(): AbstractControl {
        return this.form.controls['name'];
    }

    get amountField(): AbstractControl {
        return this.form.controls['amount'];
    }

    get executorUndersecretaryField(): AbstractControl {
        return this.form.controls['executorUndersecretary'];
    }

    get termField(): AbstractControl {
        return this.form.controls['term'];
    }

    get startedAtField(): AbstractControl {
        return this.form.controls['startedAt'];
    }

    get endedAtField(): AbstractControl {
        return this.form.controls['endedAt'];
    }
}
