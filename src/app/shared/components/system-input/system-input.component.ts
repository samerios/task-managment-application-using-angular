import { Component, input, Input, Self, ViewEncapsulation } from '@angular/core';
import { NgControl, FormControl } from '@angular/forms';

interface DropDownConfig {
  data: any[];
  translateKey?: string;
}
@Component({
  selector: 'app-system-input',
  templateUrl: './system-input.component.html',
  styleUrl: './system-input.component.scss',
})
export class SystemInputComponent {
  @Input() label = '';

  @Input({ required: true }) type!:
    | 'text'
    | 'textarea'
    | 'email'
    | 'password'
    | 'dropdown'
    | 'date';

  @Input() dropDownConfig?: DropDownConfig;

  @Input() appearance: 'outline' | 'fill' = 'fill';

  @Input() containerClasses?:string | object;
  
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  get control() {
    return this.controlDir.control as FormControl;
  }
}
