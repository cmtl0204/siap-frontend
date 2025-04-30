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
import { Fluid } from 'primeng/fluid';
import { Message } from 'primeng/message';
import { LabelDirective } from '@utils/directives/label.directive';
import { ScrollPanel } from 'primeng/scrollpanel';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ReactiveFormsModule, DatePickerModule, Fluid, Message, LabelDirective, ScrollPanel]
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
    protected validationType: string = '';
    protected dateLabel: string = '';
    protected years: any[] = [];
    protected months: any[] = [];
    protected days: number[] = [];
    protected identification!: any;

    constructor() {
        this.buildForm();

        for (let i = 2035; i > 1950; i--) {
            this.years.push({ code: i, name: i });
        }

        this.days = Array.from({ length: 31 }, (_, index) => index + 1);

        this.months = [
            { code: 1, name: '01 Enero' },
            { code: 2, name: '02 Febrero' },
            { code: 3, name: '03 Marzo' },
            { code: 4, name: '04 Abril' },
            { code: 5, name: '05 Mayo' },
            { code: 6, name: '06 Junio' },
            { code: 7, name: '07 Julio' },
            { code: 8, name: '08 Agosto' },
            { code: 9, name: '09 Septiembre' },
            { code: 10, name: '10 Octubre' },
            { code: 11, name: '11 Noviembre' },
            { code: 12, name: '12 Diciembre' }
        ];

        this.usernameField.valueChanges.subscribe((value) => {
            if (this.identification) {
                this.assignValidationType(this.identification);
            }

            if (value.length != 10) this.identification = null;

            if (value.length === 10) {
                this.verifyIdentification();
            }
        });
    }

    buildForm() {
        this.form = this._formBuilder.group({
            username: [null, [Validators.required]],
            type: [null],
            year: [null, [Validators.required]],
            month: [null, [Validators.required]],
            day: [null, [Validators.required]]
        });
    }

    onSubmit() {
        if (!this.validateForm()) {
            this.form.markAllAsTouched();
            this._customMessageService.showFormErrors(this.formErrors);
            return;
        }

        // this.signIn();
        this.validate();
    }

    // signInBackup(){
    //     this._reCaptchaV3Service
    //         .execute('login')
    //         .pipe(
    //             concatMap((token) => this._authHttpService.verifyRecaptcha(token)),
    //
    //             concatMap((recaptchaResponse: any) => (recaptchaResponse?.success ? this._authHttpService.signIn(this.form.value) : of(null)))
    //         )
    //         .subscribe({
    //             next: (responseSignIn) => {
    //                 if (responseSignIn && this._authService.roles.length === 0) {
    //                     this._authService.removeLogin();
    //                     return;
    //                 }
    //
    //                 this._router.navigateByUrl('');
    //             }
    //         });
    // }

    validate() {
        let year = this.identification.fechaEmision.substring(6, 10);
        let month = this.identification.fechaEmision.substring(3, 5);
        let day = this.identification.fechaEmision.substring(0, 2);
        this.dateLabel = 'Fecha de emisión de la cédula';

        if (this.validationType === 'expiration') {
            this.dateLabel = 'Fecha de expiración de la cédula';
            year = this.identification.fechaExpiracion.substring(6, 10);
            month = this.identification.fechaExpiracion.substring(3, 5);
            day = this.identification.fechaExpiracion.substring(0, 2);
        }

        if (parseInt(year) != this.yearField.value.code || parseInt(month) != this.monthField.value.code || parseInt(day) != this.dayField.value) {
            this._customMessageService.showError({ summary: this.dateLabel, detail: 'No coincide con su cédula' });
            return;
        }

        this._authHttpService.signInByValidationIdentification(this.usernameField.value).subscribe({
            next: (responseSignIn) => {
                this._router.navigateByUrl('/pages/users/profile');
            }
        });
    }

    validateForm() {
        this.formErrors = [];

        if (this.usernameField && this.usernameField.invalid) this.formErrors.push('Usuario');

        if (this.yearField && this.yearField.invalid) this.formErrors.push('Año');
        if (this.monthField && this.monthField.invalid) this.formErrors.push('Mes');
        if (this.dayField && this.dayField.invalid) this.formErrors.push('Día');

        return this.formErrors.length === 0 && this.form.valid;
    }

    verifyIdentification() {
        this.identification = null;

        if (this.usernameField.value.length == 10) {
            this._authHttpService.verifyIdentification(this.usernameField.value).subscribe({
                next: (response) => {
                    this.identification = response;
                    this.assignValidationType(this.identification);
                }
            });
        } else {
            this._customMessageService.showError({
                summary: 'Debe ingresar una cédula válida',
                detail: 'Intente de nuevo'
            });
        }
    }

    assignValidationType(identification: any) {
        if (!identification.fechaExpiracion || identification.fechaExpiracion === '') {
            this.validationType = 'issue';
        } else {
            this.validationType = Math.floor(Math.random() * 2) + 1 === 1 ? 'issue' : 'expiration';
        }
    }

    get usernameField(): AbstractControl {
        return this.form.controls['username'];
    }

    get yearField(): AbstractControl {
        return this.form.controls['year'];
    }

    get monthField(): AbstractControl {
        return this.form.controls['month'];
    }

    get dayField(): AbstractControl {
        return this.form.controls['day'];
    }
}
