import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { AuthService } from './auth/services/auth-service.service';
import { SharedModule } from '../shared/shared.module';
import { LoginIndexComponent } from './auth/login/components/index/index.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    LoginIndexComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
  exports:[MainComponent],
  providers: [AuthService]
})
export class CoreModule { }
