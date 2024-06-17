import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { AuthService } from './auth/services/auth-service.service';
import { CanActivateAuthGuard } from './auth/guard/can-activate.guard';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  providers: [CanActivateAuthGuard, AuthService]
})
export class CoreModule { }
