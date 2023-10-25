import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  isLoading = new BehaviorSubject<boolean>(false);

  hidden() {
    this.isLoading.next(false);
  }

  showSpinner() {
    this.isLoading.next(true);
  }
  constructor() {}
}
