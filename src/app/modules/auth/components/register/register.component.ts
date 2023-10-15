import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { PostUser } from '../../../../../model/loginData.interface';
import { Router } from '@angular/router';
import { FormService } from '../../../core/services/form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;

  registerForms = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
      ],
      nonNullable: true,
    }),
    userName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
      nonNullable: true,
    }),
    hobbies: new FormArray([new FormControl('')]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private form: FormService,
  ) {}

  ngOnInit(): void {
    this.controls.email.hasError('');
  }

  get controls() {
    return this.registerForms.controls;
  }

  get hobbies() {
    return this.registerForms.get('hobbies') as FormArray;
  }

  addControls() {
    this.hobbies.push(new FormControl(''));
  }

  removeControls(index: number) {
    this.hobbies.removeAt(index);
  }

  onRegister() {
    const dataUser: PostUser = this.registerForms.getRawValue();
    this.authService.register(dataUser).subscribe({
      next: (value) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getErrorMessage(control: FormControl) {
    return this.form.getErrorMessage(control);
  }
}
