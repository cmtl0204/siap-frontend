import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { CustomMessageService } from '@utils/services/custom-message.service';
import { AuthHttpService } from '../../auth-http.service';
import { environment } from '@env/environment';
import { PrimeIcons } from 'primeng/api';
import { AuthService } from '@modules/auth/auth.service';
import { CoreService } from '@utils/services/core.service';
import { DatePickerModule } from 'primeng/datepicker';
import { UserHttpService } from '@modules/auth/user-http.service';
import { Message } from 'primeng/message';
import { LabelDirective } from '@utils/directives/label.directive';
import { ErrorMessageDirective } from '@utils/directives/error-message.directive';
import { MY_ROUTES } from '@routes';
import { invalidEmailValidator } from '@utils/form-validators/custom-validator';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ReactiveFormsModule, DatePickerModule, Message, LabelDirective, ErrorMessageDirective]
})
export default class SignInComponent {
    protected readonly environment = environment;
    private readonly _formBuilder = inject(FormBuilder);
    private readonly _customMessageService = inject(CustomMessageService);
    private readonly _authHttpService = inject(AuthHttpService);
    private readonly _userHttpService = inject(UserHttpService);
    private readonly _authService = inject(AuthService);
    protected readonly _coreService = inject(CoreService);
    private readonly _router = inject(Router);
    protected readonly PrimeIcons = PrimeIcons;
    protected form!: FormGroup;
    protected formErrors: string[] = [];
    protected readonly MY_ROUTES = MY_ROUTES;

    constructor() {
        this.buildForm();
    }

    private buildForm() {
        this.form = this._formBuilder.group({
            username: [null, [Validators.required, invalidEmailValidator()]],
            password: [null, [Validators.required]]
        });
    }

    protected onSubmit() {
        if (!this.validateForm()) {
            this.form.markAllAsTouched();
            this._customMessageService.showFormErrors(this.formErrors);
            return;
        }

        this.signIn();
    }

    private signIn() {
        this._authHttpService.signIn(this.form.value).subscribe({
            next: (response) => {
                this._authService.selectDashboard();
            }
        });
    }

    private validateForm() {
        this.formErrors = [];

        if (this.usernameField.invalid) this.formErrors.push('Correo Electrónico');
        if (this.passwordField.invalid) this.formErrors.push('Contraseña');

        console.log(this.formErrors);
        return this.formErrors.length === 0 && this.form.valid;
    }

    protected get usernameField(): AbstractControl {
        return this.form.controls['username'];
    }

    protected get passwordField(): AbstractControl {
        return this.form.controls['password'];
    }
}
