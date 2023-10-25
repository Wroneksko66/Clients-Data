import { Component, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-phone-control',
  templateUrl: './phone-control.component.html',
  styleUrls: ['./phone-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PhoneControlComponent,
      multi: true,
    },
  ],
})
export class PhoneControlComponent implements ControlValueAccessor, OnDestroy {
  sub: Subscription = new Subscription();
  numberPrefixControl = new FormControl('', [Validators.required]);
  numberControl = new FormControl('', [Validators.required]);
  onChanges = (value: string | null) => {};
  onTouch = () => {};

  constructor() {
    this.sub.add(
      combineLatest([
        this.numberPrefixControl.valueChanges,
        this.numberControl.valueChanges,
      ]).subscribe(([prefix, number]) => {
        if (prefix && number) {
          this.onChanges('+' + prefix + number);
        } else {
          this.onChanges(null);
        }
      }),
    );
  }

  registerOnChange(fn: () => void): void {
    this.onChanges = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.numberControl.disable();
      this.numberPrefixControl.disable();
    } else {
      this.numberControl.enable();
      this.numberControl.enable();
    }
  }

  writeValue(value: string): void {
    const valueWithoutPlus = value.replace('+', '');
    const prefix = valueWithoutPlus.slice(0, 2);
    const number = valueWithoutPlus.slice(2);

    this.numberControl.setValue(number);
    this.numberPrefixControl.setValue(prefix);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
