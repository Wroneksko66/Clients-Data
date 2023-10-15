import {Component} from '@angular/core';
import {loginData} from "../../../../../model/loginData.interface";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide: boolean = true;
  text: string = "Użytkownik w swojej nazwie musi zawierać minimum 4 znaki";
  text2: string = "Hasło jest wymagane";
  errorMessage: string = "";
  loginData: loginData = {
    userName: '',
    password: ''
  }

  constructor(private authService: AuthService) {
  }

  onLogin() {
    this.authService.login(this.loginData).subscribe(
      (value) => {
        if (value.length === 0) {
          this.errorMessage = "Podano nieprawidłowe dane do logowania"
        }
      },
    error => {
        this.errorMessage = "wystąpił błąd"
    }
      )
  }

}
