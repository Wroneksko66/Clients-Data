import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import {MaterialModule} from "../shared/material/material.module";
import {RouterLink} from "@angular/router";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    RouterLink,
  ]
})
export class CoreModule { }
