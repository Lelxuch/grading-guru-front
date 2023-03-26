import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/services/auth.service";
import {PermissionService} from "../../../../core/services/permission.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;
  isLoggedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private permissionService: PermissionService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullName: [null, [Validators.required]],
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
      repPassword: [null, [Validators.required]],
    });
  }

  signup(): void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.getRawValue())
      this.authService.signup(this.signupForm.getRawValue())
        .subscribe((res: any) => {
          this.router.navigateByUrl(this.permissionService.defaultSection);
        }, (err: any) => {
          this.message.create('error', `Введены неверные данные!`);
        })
    } else {
      Object.values(this.signupForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
