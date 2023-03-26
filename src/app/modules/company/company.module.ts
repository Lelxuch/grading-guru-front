import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTypographyModule} from "ng-zorro-antd/typography";

import {DefaultPageComponent} from './pages/default-page/default-page.component';
import {NewCompanyComponent} from './pages/new-company/new-company.component';
import {AuthGuard} from "../../core/guards/auth.guard";


const routes: Routes = [
  {path: 'new', component: NewCompanyComponent},
  {path: ':companyId', component: DefaultPageComponent, children: [
      {path: 'department', loadChildren: () => import('../department/department.module').then(m => m.DepartmentModule), canActivate: [AuthGuard]}
    ]},
];

@NgModule({
  declarations: [
    DefaultPageComponent,
    NewCompanyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzTypographyModule
  ]
})
export class CompanyModule { }
