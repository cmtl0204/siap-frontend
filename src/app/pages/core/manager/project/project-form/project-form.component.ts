import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectInterface } from '@modules/core/interfaces';
import { ProjectHttpService } from '@modules/core/manager/project/project-http.service';
import { Fluid } from 'primeng/fluid';
import { InputText } from 'primeng/inputtext';
import { LabelDirective } from '@utils/directives/label.directive';
import { ErrorMessageDirective } from '@utils/directives/error-message.directive';
import { Message } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';
import { CustomMessageService } from '@utils/services/custom-message.service';
import { AuthHttpService } from '@modules/auth/auth-http.service';
import { AuthService } from '@modules/auth/auth.service';

@Component({
    selector: 'app-project-form',
    imports: [Fluid, InputText, ReactiveFormsModule, LabelDirective, ErrorMessageDirective, Message, DatePickerModule, InputNumberModule, Textarea, Button],
    templateUrl: './project-form.component.html',
    styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit {
    @Input() id!: string;
    private readonly _formBuilder = inject(FormBuilder);
    private readonly _projectHttpService = inject(ProjectHttpService);
    protected readonly _authService = inject(AuthService);
    protected readonly _customMessageService = inject(CustomMessageService);
    protected form!: FormGroup;

    constructor() {
        this.buildForm();
    }

    ngOnInit() {
        if (this.id) this.findProjectByUser();
    }

    buildForm() {
        this.form = this._formBuilder.group({
            user: [this._authService.auth, [Validators.required]],
            code: [null, [Validators.required]],
            name: [null, [Validators.required]],
            amount: [null, [Validators.required]],
            area: [null, [Validators.required]],
            term: [null, [Validators.required]],
            startedAt: [null, [Validators.required]],
            endedAt: [null, [Validators.required]],
            unit: [null, [Validators.required]],
            program: [null, [Validators.required]],
            programCode: [null, [Validators.required]]
        });
    }

    findProjectByUser() {
        this._projectHttpService.findByUser(this._authService.auth.id).subscribe({
            next: (response) => {
                console.log(response);
                if (response) {
                    this.form.patchValue(response);
                    this.form.disable();
                }
            }
        });
    }

    onSubmit() {
        if (this.validateForm()) {
            if (this.id) this.updateProject();
            else this.createProject();
        }
    }

    validateForm() {
        const errors: string[] = [];

        if (this.codeField.invalid) errors.push('Código');
        if (this.nameField.invalid) errors.push('Nombre del Proyecto');
        if (this.amountField.invalid) errors.push('Monto');
        if (this.areaField.invalid) errors.push('Área');
        if (this.termField.invalid) errors.push('Plazo');
        if (this.startedAtField.invalid) errors.push('Fecha de inicio');
        if (this.endedAtField.invalid) errors.push('Fecha de finalización');
        if (this.unitField.invalid) errors.push('Unidades ejecutoras');
        if (this.programField.invalid) errors.push('Programa');
        if (this.programCodeField.invalid) errors.push('Código de Programa');

        if (errors.length > 0) {
            this.form.markAllAsTouched();
            this._customMessageService.showFormErrors(errors);
        }

        return this.form.valid && errors.length === 0;
    }

    createProject() {
        this._projectHttpService.create(this.form.value).subscribe();
    }

    updateProject() {
        this._projectHttpService.update(this.id, this.form.value).subscribe();
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

    get areaField(): AbstractControl {
        return this.form.controls['area'];
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

    get unitField(): AbstractControl {
        return this.form.controls['unit'];
    }

    get programField(): AbstractControl {
        return this.form.controls['program'];
    }

    get programCodeField(): AbstractControl {
        return this.form.controls['programCode'];
    }

    protected readonly PrimeIcons = PrimeIcons;
}
