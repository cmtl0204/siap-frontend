import { Component } from '@angular/core';
import { Fluid } from 'primeng/fluid';
import { InputText } from 'primeng/inputtext';

@Component({
    selector: 'app-c1',
    imports: [Fluid, InputText],
    templateUrl: './c1.component.html',
    styleUrl: './c1.component.scss'
})
export class C1Component {}
