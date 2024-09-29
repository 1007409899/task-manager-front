import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CusstomValidatorService {
  uniqueControlNameValidator(controlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const group = formGroup as FormGroup; // Casting a FormGroup
      const control = group.get(controlName);
      const allControls = Object.keys(group.controls).filter(key => key !== controlName);

      if (control) {
        const currentValue = control.value?.toLowerCase();

        const hasDuplicate = allControls.some(key => {
          if (key !== 'fullName') return;
          const otherControl = group.get(key);
          return otherControl?.value?.toLowerCase() === currentValue;
        });

        return hasDuplicate ? { uniqueName: true } : null;
      }

      return null;
    };
  }
}
