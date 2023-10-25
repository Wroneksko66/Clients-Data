import { postcodeValidator } from './postcode.validator';
import { ValidatorFn } from '@angular/forms';

export class ClientValidators {
  static postCode(): ValidatorFn {
    return postcodeValidator();
  }
}
