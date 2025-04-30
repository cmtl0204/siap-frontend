import { Component, inject } from '@angular/core';
import { AppFloatingConfigurator } from '../../../../layout/component/app.floatingconfigurator';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthHttpService } from '../../auth-http.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { handleError } from '../../../../utils/exceptions/handle-error';
import { CustomMessageService } from '../../../../utils/services/custom-message.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    standalone: true,
    imports: [
        AppFloatingConfigurator,
        Button,
        InputText,
        Password,
        ReactiveFormsModule,
        RouterLink
    ]
})
export default class SignUpComponent {
    private readonly _formBuilder = inject(FormBuilder);
    private readonly _customMessageService = inject(CustomMessageService);
    private readonly _authHttpService = inject(AuthHttpService);
    protected form!: FormGroup;

    constructor() {
        this.buildForm();
    }

    buildForm() {
        this.form = this._formBuilder.group({
            email: ['asd@asd', [Validators.required, Validators.email]],
            password: ['12345678', [Validators.required]]
        });
    }

    onSubmit() {
        // this._authHttpService.signUp(this.form.value)
        //     .then(value => {
        //         this._customMessageService.showInfo({
        //             summary: 'Cuenta Creada',
        //             detail: ''
        //         });
        //     }).catch((err) => {
        //     this._customMessageService.showError({
        //         summary: 'Error al crear la cuenta',
        //         detail: handleError(err)
        //     });
        // });
    }

    getEmail() {
        return this.form.get('email');
    }

    getPassword() {
        return this.form.get('password');
    }
}
