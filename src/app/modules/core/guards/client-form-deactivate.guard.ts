import {
  ActivatedRouteSnapshot,
  CanDeactivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ClientFormComponent } from '../../clients/components/client-form/client-form.component';

export const clientFormDeactivateGuard: CanDeactivateFn<ClientFormComponent> = (
  component: ClientFormComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot,
) => {
  if (component.clientForm.dirty) {
    return window.confirm('Are you sure you want to leave');
  } else {
    return true;
  }
};
