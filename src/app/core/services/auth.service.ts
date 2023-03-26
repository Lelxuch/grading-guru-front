import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import {IUser, IUserLogin} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authDataKey = "authData";
  private tokenKey = "token"

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  get currentUser(): any {
    return JSON.parse(<string>sessionStorage.getItem(this.authDataKey));
  }

  get token(): string | null {
    return sessionStorage.getItem(this.tokenKey) as string;
  }

  get isLogged(): boolean {
    return !!this.token;
  }

  signup(user: any) {
    return this.http.post('', {});
  }

  login(user: IUserLogin) {
    const formData = new FormData();
    formData.append('login', user.login);
    formData.append('password', user.password);

    // return this.http.post(`/api/auth/token`, formData).pipe(
    //   map((response: any) => {
    //     sessionStorage.setItem(this.authDataKey, JSON.stringify(response.data));
    //     sessionStorage.setItem(this.tokenKey, response.token.accessToken);
    //     return response;
    //   })
    // )

    let loggedUser: any = {
      id: 1,
      username: 'test',
      role: 'ADMIN',
      // role: 'REGION_OPERATOR',
      // role: 'CENTER_OPERATOR',
    }

    sessionStorage.setItem(this.authDataKey, JSON.stringify(loggedUser));
    sessionStorage.setItem(this.tokenKey, "token");

    this.router.navigateByUrl('');

    return this.currentUser;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
