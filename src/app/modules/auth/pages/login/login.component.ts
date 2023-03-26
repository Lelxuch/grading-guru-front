import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {NzMessageService} from "ng-zorro-antd/message";

import {AuthService} from 'src/app/core/services/auth.service';
import {PermissionService} from "src/app/core/services/permission.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  isLoggedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private permissionService: PermissionService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.getRawValue())
      this.authService.login(this.loginForm.getRawValue())
        .subscribe((res: any) => {
          this.router.navigateByUrl(this.permissionService.defaultSection);
        }, (err: any) => {
          this.message.create('error', `Введены неверные данные!`);
        })
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
