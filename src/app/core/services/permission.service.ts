import {Injectable} from '@angular/core';

import {AuthService} from "./auth.service";
import {UserRole} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private authService: AuthService
  ) { }

  get isAdmin(): boolean {
    return this.authService?.currentUser?.role === UserRole.ADMIN;
  }

  get isRegion(): boolean {
    return this.authService?.currentUser?.role === UserRole.REGION_OPERATOR;
  }

  get isCenter(): boolean {
    return this.authService?.currentUser?.role === UserRole.CENTER_OPERATOR;
  }

  get isUser(): boolean {
    return this.authService?.currentUser?.role === UserRole.USER;
  }

  get defaultSection(): string {
    if (this.isAdmin) {
      return 'users/list';
    }
    if (this.isCenter || this.isRegion) {
      return 'applications/list';
    }
    return 'applications/list';
  }

}
