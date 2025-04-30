import { Directive, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

@Directive({
    selector: '[appLabel]',
    standalone: true
})
export class LabelDirective implements OnInit {
    private readonly elementRef = inject(ElementRef);
    private readonly renderer = inject(Renderer2);
    private _required: boolean = false;

    @Input() label: string = '';

    @Input() set required(control: AbstractControl | null) {
        if (control) {
            this._required = control?.hasValidator(Validators.required);
        }
    }

    ngOnInit(): void {
        this.setLabelText();
    }

    private setLabelText(): void {
        // Limpia cualquier contenido previo del elemento
        this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', '');
        this.renderer.addClass(this.elementRef.nativeElement, 'text-lg');
        this.renderer.addClass(this.elementRef.nativeElement, 'font-medium');
        this.renderer.addClass(this.elementRef.nativeElement, 'text-gray-700');

        // Agrega el texto del label
        const labelText = this.renderer.createText(`${this.label}:`);
        this.renderer.appendChild(this.elementRef.nativeElement, labelText);

        // Si es requerido, agrega el asterisco con estilos
        if (this._required) {
            const requiredSymbol = this.renderer.createElement('i');
            const asterisk = this.renderer.createText('*');
            // this.renderer.appendChild(requiredSymbol, asterisk);
            this.renderer.addClass(requiredSymbol, 'pi');
            this.renderer.addClass(requiredSymbol, 'pi-asterisk');
            this.renderer.setStyle(requiredSymbol, 'font-size', '0.6rem');
            this.renderer.addClass(requiredSymbol, 'text-red-500');
            this.renderer.addClass(requiredSymbol, 'text-lg');
            this.renderer.addClass(requiredSymbol, 'ml-1');
            this.renderer.appendChild(this.elementRef.nativeElement, requiredSymbol);
        }
    }
}
