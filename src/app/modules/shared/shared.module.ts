import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AlertComponent } from './components/alert/alert.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PhoneControlComponent } from './components/phone-control/phone-control.component';
import { HighLightDirective } from './directives/high-light.directive';
import { UnlessDirective } from './directives/unless.directive';

@NgModule({
  declarations: [
    AlertComponent,
    PhoneControlComponent,
    HighLightDirective,
    UnlessDirective,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    AlertComponent,
    PhoneControlComponent,
    HighLightDirective,
    UnlessDirective,
  ],
})
export class SharedModule {}
