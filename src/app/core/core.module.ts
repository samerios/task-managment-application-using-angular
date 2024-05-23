import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { AuthService } from './auth/services/auth-service.service';
import { AuthGuard } from './auth/guard/auth-guard.guard';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  providers: [AuthGuard, AuthService]
})
export class CoreModule { }
