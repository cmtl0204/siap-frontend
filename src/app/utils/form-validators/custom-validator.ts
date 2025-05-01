// src/app/validators/custom-validators.ts

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {
    static email(): ValidatorFn {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (!value || emailRegex.test(value)) {
                return null;
            }

            return { invalidEmail: true };
        };
    }
}
