import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../shared/material/material.module';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent],
  exports: [HeaderComponent, SpinnerComponent],
  imports: [SharedModule, MaterialModule, RouterLink],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
})
export class CoreModule {}
