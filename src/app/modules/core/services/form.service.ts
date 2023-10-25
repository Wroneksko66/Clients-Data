import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Ta kontrolka jest obowiązkowa';
    }
    if (control.hasError('minlength')) {
      return 'Przekazałeles za malo znakow w kontrolce';
    }
    if (control.hasError('invalidPostcode')) {
      return 'Format kodu pocztowego powinien być xx-xxx';
    }

    return control.hasError('email') ? 'Nieprawidlowy mail' : '';
  }
}
