import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";
import { AlertComponent } from './components/alert/alert.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,HttpClientModule,RouterModule
  ],
  exports: [CommonModule, ReactiveFormsModule, MaterialModule, FormsModule, AlertComponent,]
})
export class SharedModule {
}
