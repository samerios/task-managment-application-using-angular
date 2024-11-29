import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { AuthService } from './auth/services/auth-service.service';
import { SharedModule } from '../shared/shared.module';
import { LoginIndexComponent } from './auth/login/components/index/index.component';

@NgModule({
  declarations: [
    LoginIndexComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
  providers: [AuthService]
})
export class CoreModule { }
