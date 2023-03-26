import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NZ_I18N, ru_RU} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {IconsProviderModule} from './icons-provider.module';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiInterceptor} from "./core/interceptors/api";
import {BaseComponent} from "./modules/base.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzDropDownModule,
    NzModalModule,
    NzFormModule,
    NzInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: NZ_I18N, useValue: ru_RU
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
