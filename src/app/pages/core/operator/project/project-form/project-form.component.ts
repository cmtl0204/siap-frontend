import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgramInterface } from '@modules/core/interfaces';
import { ProjectHttpService } from '@modules/core/operator/project/project-http.service';
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
import { AuthService } from '@modules/auth/auth.service';
import { BreadcrumbService } from '../../../../../layout/service/breadcrumb.service';
import { MY_ROUTES } from '@routes';
import { ProgramHttpService } from '@modules/core/operator/program/program-http.service';
import { Select } from 'primeng/select';
import { Router } from '@angular/router';

@Component({
    selector: 'app-project-form',
    imports: [Fluid, InputText, ReactiveFormsModule, LabelDirective, ErrorMessageDirective, Message, DatePickerModule, InputNumberModule, Button, Select],
    templateUrl: './project-form.component.html',
    styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit, OnChanges {
    @Input() id!: string | undefined;
    private readonly _formBuilder = inject(FormBuilder);
    protected readonly _router = inject(Router);
    private readonly _breadcrumbService = inject(BreadcrumbService);
    private readonly _programHttpService = inject(ProgramHttpService);
    private readonly _projectHttpService = inject(ProjectHttpService);
    protected readonly _authService = inject(AuthService);
    protected readonly _customMessageService = inject(CustomMessageService);
    protected form!: FormGroup;
    protected programs: ProgramInterface[] = [];
    protected readonly PrimeIcons = PrimeIcons;

    constructor() {
        this._breadcrumbService.setItems([
            {
                label: 'Proyectos',
                routerLink: [MY_ROUTES.corePages.operator.project.list.absolute]
            },
            { label: 'Formulario' }
        ]);

        this.buildForm();
    }

    ngOnInit() {
        this.findPrograms();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['id'] && this.id && this.id !== 'new') {
            this.findProject();
        } else if (this.id === 'new') {
            this.form.enable(); // si quieres permitir edición
        }
    }

    buildForm() {
        this.form = this._formBuilder.group({
            user: [this._authService.auth, [Validators.required]],
            program: [null, [Validators.required]],
            amount: [null, [Validators.required]],
            code: [null, [Validators.required]],
            name: [null, [Validators.required]],
            coexecutorManagement: [null, [Validators.required]],
            executorManagement: [null, [Validators.required]],
            executorUndersecretary: [null, [Validators.required]],
            term: [null, [Validators.required]],
            startedAt: [null, [Validators.required]],
            endedAt: [null, [Validators.required]]
        });
    }

    findProject() {
        this._projectHttpService.findOne(this.id!).subscribe({
            next: (response) => {
                if (response) {
                    this.form.patchValue(response);
                    this.form.disable();
                }
            }
        });
    }

    findPrograms() {
        this._programHttpService.findAll().subscribe({
            next: (data) => {
                this.programs = data;
            }
        });
    }

    onSubmit() {
        if (this.validateForm()) {
            if (this.id === 'new') this.createProject();
            else this.updateProject();
        }
    }

    validateForm() {
        const errors: string[] = [];

        if (this.nameField.invalid) errors.push('Nombre del Proyecto');
        if (this.codeField.invalid) errors.push('Código del proyecto institucional CPI');
        if (this.amountField.invalid) errors.push('Monto total del proyecto');
        if (this.executorUndersecretaryField.invalid) errors.push('Subsecretaría ejecutora');
        if (this.termField.invalid) errors.push('Plazo de ejecución del proyecto');
        if (this.startedAtField.invalid) errors.push('Fecha inicio');
        if (this.endedAtField.invalid) errors.push('Fecha fin');
        if (this.executorManagementField.invalid) errors.push('Direcciones ejecutoras');
        if (this.programField.invalid) errors.push('Programa');
        if (this.coexecutorManagementField.invalid) errors.push('Direcciones o entidades co-ejecutoras');

        if (errors.length > 0) {
            this.form.markAllAsTouched();
            this._customMessageService.showFormErrors(errors);
        }

        return this.form.valid && errors.length === 0;
    }

    createProject() {
        this._projectHttpService.create(this.form.value).subscribe({
            next: (data) => {
                this._router.navigateByUrl(MY_ROUTES.corePages.operator.project.list.absolute);
            }
        });
    }

    updateProject() {
        this._projectHttpService.update(this.id!, this.form.value).subscribe();
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

    get coexecutorManagementField(): AbstractControl {
        return this.form.controls['coexecutorManagement'];
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

    get executorManagementField(): AbstractControl {
        return this.form.controls['executorManagement'];
    }

    get programField(): AbstractControl {
        return this.form.controls['program'];
    }

    get executorUndersecretaryField(): AbstractControl {
        return this.form.controls['executorUndersecretary'];
    }
}
