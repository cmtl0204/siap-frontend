import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Fluid } from 'primeng/fluid';
import { InputText } from 'primeng/inputtext';
import { InputOtpModule } from 'primeng/inputotp';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageDirective } from '@utils/directives/error-message.directive';
import { LabelDirective } from '@utils/directives/label.directive';
import { UserHttpService } from '@modules/auth/user-http.service';
import { AuthService } from '@modules/auth/auth.service';
import { differenceInYears } from 'date-fns';
import { Divider } from 'primeng/divider';
import { CustomMessageService } from '@utils/services/custom-message.service';
import { Toolbar } from 'primeng/toolbar';
import { PrimeIcons } from 'primeng/api';
import { SkeletonComponent } from '@utils/components/skeleton/skeleton.component';
import { CoreService } from '@utils/services/core.service';
import { Message } from 'primeng/message';
import { Textarea } from 'primeng/textarea';
import { Dialog } from 'primeng/dialog';
import { AuthHttpService } from '@modules/auth/auth-http.service';
import { Tooltip } from 'primeng/tooltip';
import { DatePipe } from '@angular/common';
import { KeyFilter } from 'primeng/keyfilter';

@Component({
    selector: 'app-personal-information',
    imports: [Button, Fluid, InputText, FormsModule, ErrorMessageDirective, LabelDirective, ReactiveFormsModule, Divider, Toolbar, SkeletonComponent, Message, Textarea, InputOtpModule, Dialog, Tooltip, DatePipe, KeyFilter],
    templateUrl: './personal-information.component.html',
    styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent implements OnInit {
    @Output() next: EventEmitter<null> = new EventEmitter();
    private readonly _formBuilder = inject(FormBuilder);
    private readonly _authHttpService = inject(AuthHttpService);
    private readonly _authService = inject(AuthService);
    private readonly _userHttpService = inject(UserHttpService);
    private readonly _customMessageService = inject(CustomMessageService);
    protected form!: FormGroup;
    protected readonly _coreService = inject(CoreService);
    protected readonly PrimeIcons = PrimeIcons;
    protected editingControl: FormControl = new FormControl(false);
    protected transactionalCodeControl: FormControl = new FormControl(
        {
            value: null,
            disabled: true
        },
        [Validators.required]
    );
    protected emailControl: FormControl = new FormControl(null, [Validators.required, Validators.email]);
    protected transactionalCode: string = '';
    protected updateVisible = false;
    protected blockSpace: RegExp = /^\S*$/;

    constructor() {
        this.buildForm();

        this.editingControl.valueChanges.subscribe((value) => {
            if (value) {
                this.correoField.enable();
            } else {
                this.correoField.disable();
            }
        });

        this.emailControl.valueChanges.subscribe(() => {
            this.transactionalCodeControl.reset();
            this.transactionalCodeControl.disable();

            if (this.emailControl.invalid) {
                this.transactionalCodeControl.setValue(null);
            }
        });

        this.transactionalCodeControl.valueChanges.subscribe((value) => {
            if (value && value.length === 6) {
                this._authHttpService.verifyTransactionalCode(value, this.emailControl.value).subscribe({
                    next: () => {
                        this.updateEmail();
                    }
                });
            }
        });
    }

    ngOnInit() {
        this.findPersonalInformation();
    }

    buildForm() {
        this.form = this._formBuilder.group({
            additionalInformation: this.additionalInformationForm
        });

        this.form.disable();
    }

    findPersonalInformation() {
        this._userHttpService.findPersonalInformation(this._authService.auth.id).subscribe({
            next: (response) => {
                this.form.patchValue(response);

                if (this.fechaNacimientoField?.value) {
                    this.edadField?.setValue(differenceInYears(new Date(), new Date(this.fechaNacimientoField.value)));
                }
            }
        });
    }

    onSubmit() {
        if (this.editingControl.value) {
            if (this.validateForm) {
                this.updatePersonalInformation();
            }
        } else {
            this.next.next(null);
        }
    }

    get validateForm(): boolean {
        const errors: string[] = [];

        if (errors.length > 0) {
            this._customMessageService.showFormErrors(errors);
            this.form.markAsTouched();
            return false;
        }

        return true;
    }

    updatePersonalInformation() {
        this._userHttpService.updatePersonalInformation(this._authService.auth.id, this.form.value).subscribe({
            next: () => {
                this.next.next(null);
            }
        });
    }

    updateEmail() {
        this._userHttpService.updateEmail(this._authService.auth.id, this.emailControl.value).subscribe({
            next: () => {
                this.correoField.setValue(this.emailControl.value);
                this.transactionalCodeControl.reset();
                this.emailControl.reset();
                this.updateVisible = false;
                this.findPersonalInformation();
            }
        });
    }

    requestTransactionalEmailCode() {
        this.transactionalCodeControl.setValue(null);
        this.transactionalCodeControl.disable();

        this._authHttpService.requestTransactionalEmailCode(this.emailControl.value).subscribe({
            next: (response) => {
                this.transactionalCodeControl.setValue(null);
                this.transactionalCodeControl.enable();
            }
        });
    }

    get additionalInformationForm() {
        return this._formBuilder.group({
            edad: [null, [Validators.required]],
            idEcuatorianosenaccion: [null, [Validators.required]],
            cedula: [null, [Validators.required]],
            fechaNacimiento: [null, [Validators.required]],
            nombres: [null, [Validators.required]],
            genero: [null, [Validators.required]],
            idProvincia: [null, [Validators.required]],
            provincia: [null, [Validators.required]],
            idCanton: [null, [Validators.required]],
            canton: [null, [Validators.required]],
            idParroquia: [null, [Validators.required]],
            parroquia: [null, [Validators.required]],
            barrio: [null, [Validators.required]],
            callePrincipal: [null, [Validators.required]],
            calleSecundaria: [null, [Validators.required]],
            telefono: [null, [Validators.required]],
            correo: [null, [Validators.required]],
            nombreInstitucion: [null, [Validators.required]],
            siglas: [null, [Validators.required]],
            nombreActividad: [null, [Validators.required]],
            cambioCuenta: [null, [Validators.required]],
            tipoCuenta: [null, [Validators.required]],
            numeroCuenta: [null, [Validators.required]],
            nombreCorto: [null, [Validators.required]],
            nacionalidad: [null, [Validators.required]],
            consentimiento: [null, [Validators.required]],
            terminosCondiciones: [null, [Validators.required]],
            fechaRegistro: [null, [Validators.required]],
            fechaModifica: [null, [Validators.required]],
            fechaCorte: [null, [Validators.required]],
            numeroPago: [null, [Validators.required]],
            monto: [null, [Validators.required]],
            estadoOpi: [null, [Validators.required]],
            fechaActualizacionCorreo: [null]
        });
    }

    /** Getters **/
    get additionalInformationFormField(): FormGroup {
        return this.form.controls['additionalInformation'] as FormGroup;
    }

    get edadField(): AbstractControl {
        return this.additionalInformationFormField.controls['edad'];
    }

    get idEcuatorianosenaccionField(): AbstractControl {
        return this.additionalInformationFormField.controls['idEcuatorianosenaccion'];
    }

    get cedulaField(): AbstractControl {
        return this.additionalInformationFormField.controls['cedula'];
    }

    get fechaNacimientoField(): AbstractControl {
        return this.additionalInformationFormField.controls['fechaNacimiento'];
    }

    get nombresField(): AbstractControl {
        return this.additionalInformationFormField.controls['nombres'];
    }

    get generoField(): AbstractControl {
        return this.additionalInformationFormField.controls['genero'];
    }

    get idProvinciaField(): AbstractControl {
        return this.additionalInformationFormField.controls['idProvincia'];
    }

    get provinciaField(): AbstractControl {
        return this.additionalInformationFormField.controls['provincia'];
    }

    get idCantonField(): AbstractControl {
        return this.additionalInformationFormField.controls['idCanton'];
    }

    get cantonField(): AbstractControl {
        return this.additionalInformationFormField.controls['canton'];
    }

    get idParroquiaField(): AbstractControl {
        return this.additionalInformationFormField.controls['idParroquia'];
    }

    get parroquiaField(): AbstractControl {
        return this.additionalInformationFormField.controls['parroquia'];
    }

    get barrioField(): AbstractControl {
        return this.additionalInformationFormField.controls['barrio'];
    }

    get callePrincipalField(): AbstractControl {
        return this.additionalInformationFormField.controls['callePrincipal'];
    }

    get calleSecundariaField(): AbstractControl {
        return this.additionalInformationFormField.controls['calleSecundaria'];
    }

    get telefonoField(): AbstractControl {
        return this.additionalInformationFormField.controls['telefono'];
    }

    get correoField(): AbstractControl {
        return this.additionalInformationFormField.controls['correo'];
    }

    get nombreInstitucionField(): AbstractControl {
        return this.additionalInformationFormField.controls['nombreInstitucion'];
    }

    get siglasField(): AbstractControl {
        return this.additionalInformationFormField.controls['siglas'];
    }

    get nombreActividadField(): AbstractControl {
        return this.additionalInformationFormField.controls['nombreActividad'];
    }

    get tipoCuentaField(): AbstractControl {
        return this.additionalInformationFormField.controls['tipoCuenta'];
    }

    get numeroCuentaField(): AbstractControl {
        return this.additionalInformationFormField.controls['numeroCuenta'];
    }

    get nombreCortoField(): AbstractControl {
        return this.additionalInformationFormField.controls['nombreCorto'];
    }

    get nacionalidadField(): AbstractControl {
        return this.additionalInformationFormField.controls['nacionalidad'];
    }

    get consentimientoField(): AbstractControl {
        return this.additionalInformationFormField.controls['consentimiento'];
    }

    get terminosCondicionesField(): AbstractControl {
        return this.additionalInformationFormField.controls['terminosCondiciones'];
    }

    get fechaRegistroField(): AbstractControl {
        return this.additionalInformationFormField.controls['fechaRegistro'];
    }

    get fechaModificaField(): AbstractControl {
        return this.additionalInformationFormField.controls['fechaModifica'];
    }

    get fechaCorteField(): AbstractControl {
        return this.additionalInformationFormField.controls['fechaCorte'];
    }

    get numeroPagoField(): AbstractControl {
        return this.additionalInformationFormField.controls['numeroPago'];
    }

    get montoField(): AbstractControl {
        return this.additionalInformationFormField.controls['monto'];
    }

    get estadoOpiField(): AbstractControl {
        return this.additionalInformationFormField.controls['estadoOpi'];
    }

    get fechaActualizacionCorreoField(): AbstractControl {
        return this.additionalInformationFormField.controls['fechaActualizacionCorreo'];
    }
}
