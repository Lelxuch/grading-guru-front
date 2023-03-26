import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import {NzMessageService} from "ng-zorro-antd/message";

import {PermissionService} from "../services/permission.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private permissionService: PermissionService,
    private message: NzMessageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.permissionService.isAdmin) {
      this.router.navigateByUrl('/applications');
      this.message.create('error', 'У вас недостаточно прав')
    }
    return this.permissionService.isAdmin;
  }
  
}
