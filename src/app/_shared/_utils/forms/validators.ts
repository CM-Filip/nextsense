import { AbstractControl, ValidatorFn } from "@angular/forms";

export namespace CustomValidators {

  export function range(min: number, max: number): ValidatorFn {
    return (control: AbstractControl<number | null>) => {
      if (!control.value) return null;
      return control.value >= min && control.value <= max
        ? null
        : { range: { min: min, max: max } };
    }
  }

  export function lengthRange(min: number, max: number): ValidatorFn {
    return (control: AbstractControl<string | null>) => {
      if (!control.value) return null;
      return control.value.length >= min && control.value.length <= max
        ? null
        : { lengthRange: { min: min, max: max } };
    }
  }

  export function wordCountRange(min: number, max: number): ValidatorFn {
    return (control: AbstractControl<string | null>) => {
      if (!control.value) return null;
      const wordCount: number = control.value.split(' ').length;
      return wordCount >= min && wordCount <= max
        ? null
        : { wordCountRange: { min: min, max: max } };
    }
  }

  export function email(control: AbstractControl<string | null>) {
    if (!control.value) return null;
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(control.value)
      ? null
      : { email: true };
  }

  export function phone(control: AbstractControl<string | null>) {
    if (!control.value) return null;
    return /^(0[23456789]\d{1} \d{3} \d{3}|\+389 [23456789]\d \d{3} \d{3})$/.test(control.value)
      ? null
      : { phone: true };
  }
}