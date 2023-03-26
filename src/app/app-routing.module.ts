import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "./core/guards/auth.guard";
import {BaseComponent} from "./modules/base.component";
import {NotFoundComponent} from "./shared/pages/not-found/not-found.component";

const routes: Routes = [
  {path: '', component: BaseComponent, canActivate: [AuthGuard],
    children: [
      {path: 'company', loadChildren: () => import('./modules/company/company.module').then(m => m.CompanyModule), canActivate: [AuthGuard]}
    ]
  },
  {path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
