import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import {
  GetUserResponse,
  loginData,
  PostUser,
  PostUserResponse,
  User,
} from '../../../../model/loginData.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  user = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(userData: loginData): Observable<User[]> {
    return this.http.get<GetUserResponse[]>(this.apiUrl + '/users').pipe(
      map((userArr: GetUserResponse[]) =>
        userArr.filter(
          (user: GetUserResponse) =>
            user.userName == userData.userName &&
            user.password == userData.password,
        ),
      ),
      map((userArr) =>
        userArr.map((user) => new User(user.email, user.userName)),
      ),
      tap((user: User[]) => this.handleAuthentication(user)),
    );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const userData: { email: string; username: string } = JSON.parse(
      localStorage.getItem('user') as string,
    );
    if (!userData) {
      return;
    }

    const user = new User(userData.email, userData.username);
    this.user.next(user);
  }

  register(dataUser: PostUser): Observable<PostUserResponse> {
    return this.http.post<PostUserResponse>(this.apiUrl + '/users', dataUser);
  }

  private handleAuthentication(userArr: User[]) {
    if (userArr.length === 0) {
      return;
    }
    const user: User = userArr[0];
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['clients']);
  }
}
