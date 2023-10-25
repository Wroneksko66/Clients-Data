import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client, PostClientForm } from '../../../../../model/client.model';
import { FormService } from '../../../core/services/form.service';
import { ClientsService } from '../../../core/services/clients.service';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { postcodeValidator } from '../../../shared/validators/postcode.validator';
import { ClientValidators } from '../../../shared/validators/client.validators';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  @Input() editClient = false;
  @Input() client!: Client;
  @Output() closeDialog = new EventEmitter<void>();
  clientForm!: FormGroup<PostClientForm>;
  errorMessage: string = '';
  observer: Observer<unknown> = {
    next: () => {
      (this.errorMessage = ''), this.router.navigate(['/clients']);
    },
    error: (err) => {
      this.errorMessage = 'Wystapił błąd';
    },
    complete: () => {
      console.log('udało się');
    },
  };
  constructor(
    private form: FormService,
    private clientsService: ClientsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get controls() {
    return this.clientForm.controls;
  }

  private initForm() {
    this.clientForm = new FormGroup({
      firstname: new FormControl(this.editClient ? this.client.firstname : '', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      surname: new FormControl(this.editClient ? this.client.surname : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl(this.editClient ? this.client.email : '', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl(this.editClient ? this.client.phone : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      address: new FormControl(this.editClient ? this.client.address : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      postcode: new FormControl(this.editClient ? this.client.postcode : '', {
        nonNullable: true,
        validators: [Validators.required, ClientValidators.postCode()],
      }),
    });
  }

  addClient() {
    if (this.editClient) {
      this.clientsService
        .putClient(this.clientForm.getRawValue(), this.client.id)
        .subscribe(this.observer);
      return;
    }

    this.clientsService
      .postClient(this.clientForm.getRawValue())
      .subscribe(this.observer);
  }

  getErrorMessage(control: FormControl) {
    return this.form.getErrorMessage(control);
  }

  emitCloseDialog() {
    this.closeDialog.emit();
  }
}
