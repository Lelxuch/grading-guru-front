import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzCardModule} from "ng-zorro-antd/card";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzListModule} from "ng-zorro-antd/list";
import {NzSpinModule} from 'ng-zorro-antd/spin';

import {NewDepartmentComponent} from './pages/new-department/new-department.component';
import {DefaultPageComponent} from './pages/default-page/default-page.component';
import {MembersComponent} from './pages/members/members.component';
import {RequestsComponent} from './pages/requests/requests.component';
import {HistoryComponent} from './pages/history/history.component';
import {HomeComponent} from './pages/home/home.component';
import {RequestPageComponent} from './pages/request-page/request-page.component';

const routes: Routes = [
  {path: 'new', component: NewDepartmentComponent},
  {path: ':departmentId', component: DefaultPageComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'members', component: MembersComponent},
      {path: 'requests', component: RequestsComponent},
      {path: 'requests/:requestId', component: RequestPageComponent},
      {path: 'history', component: HistoryComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
    ]}
];

@NgModule({
  declarations: [
    DefaultPageComponent,
    NewDepartmentComponent,
    MembersComponent,
    RequestsComponent,
    HistoryComponent,
    HomeComponent,
    RequestPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzTypographyModule,
    NzSelectModule,
    NzIconModule,
    NzInputNumberModule,
    NzCardModule,
    NzTabsModule,
    NzListModule,
    NzSpinModule,
  ]
})
export class DepartmentModule { }
