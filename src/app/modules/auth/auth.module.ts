import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzMessageModule} from 'ng-zorro-antd/message';

import {LoginComponent} from "./pages/login/login.component";
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NzSpaceModule,
    NzGridModule,
    NzLayoutModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzMessageModule
  ]
})
export class AuthModule { }
